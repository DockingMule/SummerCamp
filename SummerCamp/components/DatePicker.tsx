import React, { useState, useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  selectedDates?: Date[];
  onDatesChange?: (dates: Date[]) => void;
};

const SelectsMultipleFormat: React.FC<Props> = ({ selectedDates: initialDates, onDatesChange }) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>(initialDates ?? []);

  // keep internal state in sync when parent passes new selectedDates
  React.useEffect(() => {
    setSelectedDates(initialDates ?? []);
  }, [initialDates]);

  const onChange = useCallback(
    (dates: any) => {
      // react-datepicker may pass a single Date or an array when using selectsMultiple
      let next: Date[] = [];
      if (Array.isArray(dates)) next = dates as Date[];
      else if (dates instanceof Date) next = [dates];
      else next = [];
      setSelectedDates(next);
      if (onDatesChange) onDatesChange(next);
    },
    [onDatesChange],
  );

  const formatMultipleDates = useCallback(
    (dates: Date[], formatDate: (date: Date) => string) => dates.map(formatDate).join(" | "),
    [],
  );

  const includeDates = [
    new Date(2026, 5, 29), new Date(2026, 5, 30), new Date(2026, 6, 1), new Date(2026, 6, 2),
    new Date(2026, 6, 6), new Date(2026, 6, 7), new Date(2026, 6, 8), new Date(2026, 6, 9),
    new Date(2026, 6, 13), new Date(2026, 6, 14), new Date(2026, 6, 15), new Date(2026, 6, 16),
    new Date(2026, 6, 20), new Date(2026, 6, 21), new Date(2026, 6, 22), new Date(2026, 6, 23),
  ];

  return (
    <div>
      <DatePicker
        // use `selectedDates` prop (per some examples) and avoid passing `selected` to prevent conflicts
        selectedDates={selectedDates as unknown as any}
        selectsMultiple
        onChange={onChange}
        shouldCloseOnSelect={false}
        disabledKeyboardNavigation
        includeDates={includeDates}
        formatMultipleDates={formatMultipleDates}
        inline
      />
      <div style={{ marginTop: 8, color: "#222" }}>
        {selectedDates.length ? 'Estimated Cost: $' + selectedDates.length * 60 : ''}
      </div>
    </div>
  );
};

export default SelectsMultipleFormat;