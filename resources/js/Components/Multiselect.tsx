import React, { useState } from 'react';
import { Select } from '@/Components/ui/select';

type Option = {
    label: string;
    value: string;
};

type MultiSelectProps = {
    options: Option[];
    onChange: (values: string[]) => void;
};

const MultiSelect = ({ options, onChange }: MultiSelectProps) => {
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

    const handleSelect = (option: Option) => {
        setSelectedOptions([...selectedOptions, option]);
        onChange([...selectedOptions, option.value]);
    };

    const handleRemove = (option: Option) => {
        setSelectedOptions(selectedOptions.filter(o => o.value !== option.value));
        onChange(selectedOptions.filter(o => o.value !== option.value));
    };

    return (
        <div>
            {selectedOptions.map(option => (
                <div key={option.value}>
                    <span>{option.label}</span>
                    <button type="button" onClick={() => handleRemove(option)}>
                        Remove
                    </button>
                </div>
            ))}
            <Select
                options={options.filter(option => !selectedOptions.find(o => o.value === option.value))}
                onValueChange={handleSelect}
            />
        </div>
    );
};

export default MultiSelect;
