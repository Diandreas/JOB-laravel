import React from 'react';

const RepeatableForm = ({ values, onValueChange, onAdd, onRemove, type }) => (
    <div>
        {values.map((value, index) => (
            <div key={index}>
                {type === 'summary' && (
                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={value.name}
                            onChange={(event) => onValueChange(index, event)}
                        />
                        <br />
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={value.description}
                            onChange={(event) => onValueChange(index, event)}
                        />
                        <br />
                    </div>
                )}

                {type === 'experience' && (
                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={value.name}
                            onChange={(event) => onValueChange(index, event)}
                        />
                        <br />
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={value.description}
                            onChange={(event) => onValueChange(index, event)}
                        />
                        <br />
                        <input
                            type="date"
                            name="date_start"
                            value={value.date_start}
                            onChange={(event) => onValueChange(index, event)}
                        />
                        <br />
                        <input
                            type="date"
                            name="date_end"
                            value={value.date_end}
                            onChange={(event) => onValueChange(index, event)}
                        />
                        <br />
                        <input
                            type="text"
                            name="output"
                            placeholder="Output"
                            value={value.output}
                            onChange={(event) => onValueChange(index, event)}
                        />
                        <br />
                        <input
                            type="text"
                            name="institution_name"
                            placeholder="Institution Name"
                            value={value.institution_name}
                            onChange={(event) => onValueChange(index, event)}
                        />
                        <br />
                        <textarea
                            name="comment"
                            placeholder="Comment"
                            value={value.comment}
                            onChange={(event) => onValueChange(index, event)}
                        />
                        <br />
                    </div>
                )}

                <button type="button" onClick={() => onRemove(index, type)}>
                    Remove
                </button>
            </div>
        ))}

        <button type="button" onClick={() => onAdd(type)}>
            Add {type}
        </button>
    </div>
);

export default RepeatableForm;
