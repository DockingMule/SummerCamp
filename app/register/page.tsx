"use client";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import '../globals.css';

export default function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [data, setData] = useState("");
  const [banner, setBanner] = useState("");
  const [showBanner, setShowBanner] = useState(false);
  const bannerTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (bannerTimer.current) {
        clearTimeout(bannerTimer.current);
      }
    };
  }, []);

  function showBannerMessage(msg: string, timeout = 30000) {
    setBanner(msg);
    setShowBanner(true);
    if (bannerTimer.current) clearTimeout(bannerTimer.current);
    bannerTimer.current = window.setTimeout(() => {
      setShowBanner(false);
      bannerTimer.current = null;
    }, timeout) as unknown as number;
  }

  function onSubmit(formData: any) {
    setData(JSON.stringify(formData));
    showBannerMessage("Registration received");
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
            {errors.age || errors.childFirstName || errors.childLastName || errors.parentFirstName || errors.parentLastName || errors.parentEmail || errors.parentPhone ? (
              <p style={{color: 'red', fontSize: 18}}>* Required field</p>
            ) : null}
            <p>{data}</p>
            <input type="submit" value="Submit Registration" />
        </form>
    </div>
  );
}