import { Autocomplete, Checkbox, TextField } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CustomAutocomplete({ data = [], selected, onSelect }) {
    const value = data.filter(item => selected.includes(item.id))

    return (
        <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={data}
            value={value}
            disableCloseOnSelect
            getOptionLabel={(option) => option.title}
            renderOption={(props, option, { selected }) => {
                return (
                    <li key={option.id} {...props}>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                        />
                        {option.title}
                    </li>
                )
            }}
            renderInput={(params) => (
                <TextField {...params} label="Essential ingredients" placeholder="Choose Essential ingredients" />
            )}
            onChange={(_, val) => onSelect(val)}
        />
    );
}