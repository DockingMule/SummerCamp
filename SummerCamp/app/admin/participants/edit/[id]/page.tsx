"use client";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "../../../../../components/DatePicker";
import '../../../../globals.css';
import { useParams, useRouter } from 'next/navigation';
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

export default function App() {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState("");
  const [banner, setBanner] = useState("");
  const [showBanner, setShowBanner] = useState(false);
  const bannerTimer = useRef<number | null>(null);

  const isAuthenticated = useIsAuthenticated();
  const { push } = useRouter();

  useEffect(() => {
      if (!isAuthenticated) push('/login');
  }, [isAuthenticated, push]);

  useEffect(() => {
    return () => {
      if (bannerTimer.current) {
        clearTimeout(bannerTimer.current);
      }
    };
  }, []);

  // register a non-visual field to hold selected dates
  useEffect(() => {
    register("dates");
  }, [register]);

  // load existing participant when editing
  useEffect(() => {
    const id = params?.id;
    if (!id) return;

    let mounted = true;
    const controller = new AbortController();

    (async () => {
      try {
        const res = await fetch(`http://localhost:8080/participants/${id}`, { signal: controller.signal });
        if (!res.ok) {
          showBannerMessage(`Failed to load participant: ${res.status}`);
          return;
        }
        const json = await res.json();
        if (!mounted) return;
        // populate form fields
        setValue('childFirstName', json.first_name || '');
        setValue('childLastName', json.last_name || '');
        setValue('age', json.age ?? null);
        setValue('gender', json.gender || '');
        setValue('aboutYou', json.additional_information || '');
        setValue('parentFirstName', json.guardian_first_name || '');
        setValue('parentLastName', json.guardian_last_name || '');
        setValue('parentEmail', json.guardian_email || '');
        setValue('parentPhone', json.guardian_phone || '');
        // store as string to match the <select> option values
        setValue('paidInFull', String(json.paid_in_full || false));
        setValue('amountPaid', json.amount_paid ?? 0.0);
        // convert dates strings to Date objects for DatePicker
        if (Array.isArray(json.dates)) {
          const dates = json.dates.map((s: string) => new Date(s));
          setValue('dates', dates);
        } else {
          setValue('dates', []);
        }
      } catch (err: any) {
        if (err.name === 'AbortError') return;
        showBannerMessage(`Error loading participant: ${err?.message || err}`);
      }
    })();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [params, setValue]);

  function showBannerMessage(msg: string, timeout = 30000) {
    setBanner(msg);
    setShowBanner(true);
    if (bannerTimer.current) clearTimeout(bannerTimer.current);
    bannerTimer.current = window.setTimeout(() => {
      setShowBanner(false);
      bannerTimer.current = null;
    }, timeout) as unknown as number;
  }

  async function onSubmit(formData: any) {
    // normalize paidInFull from select (string) or boolean into a boolean
    const paidInFull = formData.paidInFull === 'true' || formData.paidInFull === true;
    // prepare payload mapping to the Go API Participant model
    const payload = {
      first_name: formData.childFirstName || "",
      last_name: formData.childLastName || "",
      age: formData.age || null,
      gender: formData.gender || "",
      additional_information: formData.aboutYou || "",
      dates: Array.isArray(formData.dates)
        ? formData.dates.map((d: any) => {
            if (d instanceof Date) return d.toISOString();
            try {
              return new Date(d).toISOString();
            } catch (_) {
              return String(d);
            }
          })
        : [],
      guardian_first_name: formData.parentFirstName || "",
      guardian_last_name: formData.parentLastName || "",
      guardian_email: formData.parentEmail || "",
      guardian_phone: formData.parentPhone || "",
      paid_in_full: paidInFull,
      amount_paid: Number(formData.amountPaid) || 0.0,
      accepted: false,
    };

    const id = params?.id;
    if (!id) {
      showBannerMessage('Missing participant id — cannot update', 10000);
      return;
    }

    try {
      const url = `http://localhost:8080/participants/${id}`;
      const res = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        showBannerMessage(`Update failed: ${res.status} ${text}`, 10000);
        setData(JSON.stringify({ status: res.status, body: text }));
        return;
      }

      const updated = await res.json();
      setData(JSON.stringify(updated));
      showBannerMessage('Participant updated', 10000);
      router.push('/admin/participants');
    } catch (err: any) {
      showBannerMessage(`Network error: ${err?.message || err}`, 10000);
      setData(JSON.stringify({ error: String(err) }));
    }
  }

  return (
    <div className="content">
        {showBanner && <div className="announcement">{banner}</div>}
        <form className="registration" onSubmit={handleSubmit(onSubmit)}>
            <h1>Participant's Information</h1>
          <input
            {...register("childFirstName", { required: "First name is required" })}
            placeholder="First name*"
            className={errors.childFirstName ? 'error' : ''}
          />
            <input
              {...register("childLastName", { required: "Last name is required" })}
              placeholder="Last name*"
              className={errors.childLastName ? 'error' : ''}
            />
            <select {...register("gender")}>
                <option value="">Gender...</option>
                <option value="A">Male</option>
                <option value="B">Female</option>
                <option value="C">Other</option>
            </select>
            <input
                type="number"
                placeholder="Age*"
                {...register("age", {
                valueAsNumber: true,
                required: true,
                min: { value: 4, message: "Participant must be at least 4 years old" },
                max: { value: 17, message: "Participant must be less than 17 years old" },
                })}
            className={errors.age ? 'error' : ''}
          />
            <textarea {...register("aboutYou")} placeholder="Anything else we should know (allergies, special needs, etc.)" className={errors.aboutYou ? 'error' : ''} />
            <h1>Parent/Guardian's Information</h1>
            <input
              {...register("parentFirstName", { required: "Parent first name is required" })}
              placeholder="First name*"
              className={errors.parentFirstName ? 'error' : ''}
            />

            <input
              {...register("parentLastName", { required: "Parent last name is required" })}
              placeholder="Last name*"
              className={errors.parentLastName ? 'error' : ''}
            />

            <input
              {...register("parentEmail", { required: "Parent email is required" })}
              placeholder="Email*"
              className={errors.parentEmail ? 'error' : ''}
            />

            <input
              {...register("parentPhone", { required: "Parent phone is required" })}
              placeholder="Phone Number*"
              className={errors.parentPhone ? 'error' : ''}
            />
            <h1>Select Dates</h1>
            <small>Whole weeks are preferred but individual days are acceptable.</small>
            <small>Note: Weeks 1 and 2 are at our Deptford location while weeks 3 and 4 are at our Woodbury location.</small>
            <DatePicker selectedDates={watch('dates') ?? []} onDatesChange={(dates: Date[]) => setValue("dates", dates)} />
            <h1>Payment Information</h1>
            <p>Amount Paid (Admin Only)
            <input
              type="number"
              step="0.01"
              {...register("amountPaid", {
                valueAsNumber: true,
                required: false,
                min: { value: 0.0, message: "Amount paid cannot be negative" },
              })}
              className={errors.amountPaid ? 'error' : ''}
            />
            </p>
            <p>Paid in Full (Admin Only)
            <label>
              <select {...register("paidInFull")}>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </label>
            </p>
            {errors.age || errors.childFirstName || errors.childLastName || errors.parentFirstName || errors.parentLastName || errors.parentEmail || errors.parentPhone ? (
              <p style={{color: 'red', fontSize: 18}}>* Required field</p>
            ) : null}
            <div style={{display: 'flex', gap: 8, alignItems: 'center'}}>
              <input type="submit" value="Update Participant" />
              <button
                type="button"
                onClick={() => router.push('/admin/participants')}
                style={{padding: '8px 12px', background: '#eee', border: '1px solid #ccc', cursor: 'pointer'}}
              >
                Cancel
              </button>
            </div>
        </form>
    </div>
  );
}