import { useState, useEffect, useContext, useMemo } from 'react';
import Chip from '@material-ui/core/Chip';
import * as React from 'react';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { apiProvider } from '../providers/Provider';

export default function SearchBar(props) {
    console.log("Category", props.category)
    const [tags, setTags] = useState([])

    useEffect(() => {
        apiProvider.getAll('tags', setTags)
    }, [])

    const sorted = tags.sort((a, b) => a.category.toString() < b.category.toString() ? 1 : -1)

    return (
        <div>
            <Autocomplete
                name="tags"
                options={sorted}
                groupBy={(option) => option.category.toString()}
                getOptionLabel={(option) => option.acronym.toString()}
                //onChange={(e, value, _) => setOrgFilterValue(getOrgIds(value))}
                loading={tags.length === 0}
                renderInput={(params) => 
                    <TextField 
                        style={{}} 
                        {...params} 
                        margin="normal" 
                        variant="standard"
                    />}
                getOptionSelected={(option, value) => option.acronym === value.acronym}
                limitTags={1}
                classes={{
                    tag: "MuiChip-root custom-tag filter-tag",
                }}
                // clearOnEscape
                multiple
            />

        </div>
    )
}



