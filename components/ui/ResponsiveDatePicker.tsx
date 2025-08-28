import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface ResponsiveDatePickerProps {
    setTransactionDate: (date: dayjs.Dayjs) => void
}

export default function ResponsiveDatePicker({ setTransactionDate }: ResponsiveDatePickerProps) {
    const [value, setValue] = React.useState<dayjs.Dayjs | null>(dayjs(new Date()))

    const handleChange = (newValue: dayjs.Dayjs | null) => {
        setValue(newValue)
        if (newValue !== null)
            setTransactionDate(newValue)
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
                <DemoItem>
                    <DatePicker value={value} onChange={handleChange}
                        sx={{
                            '& .css-5rcoci-MuiStack-root-focused': {
                                bgcolor: 'red',
                            },
                            '& .MuiPickersOutlinedInput-root': {
                                bgcolor: 'var(--foreground)',
                                color: 'var(--background)',
                                borderRadius: '0.2rem',
                                fontSize: '0.9rem',
                            },
                            '& .MuiPickersSectionList-root': {
                                paddingY: "0.6rem",
                            },            
                        }}
                    />
                </DemoItem>
            </DemoContainer>
        </LocalizationProvider>
    );
}