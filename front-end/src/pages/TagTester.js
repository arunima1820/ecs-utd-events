//@author: Arunima and Afrida
import { useState, useEffect, useContext, useMemo } from 'react';
import Chip from '@material-ui/core/Chip';
import * as React from 'react';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { apiProvider } from '../providers/Provider';
import { AllOrgContext } from '../providers/AllOrgProvider';

export default function TagTester() {
    const [tags, setTags] = useState([])
    const orgs = useContext(AllOrgContext)

    useEffect(() => {
        apiProvider.getAll('tags', setTags)
    }, [])

    const sorted = tags.sort((a, b) => a.category.toString() < b.category.toString() ? 1 : -1)

    function handleChange(tags) {
        console.log("VALUE", tags)
        var filteredOrgs = []
        for (const tag of tags) {
            if (tag.category == 'Organization') 
                filteredOrgs.push(orgs.find(org => org.uId === tag.id))
        }
        console.log(filteredOrgs)    
    }

    return (
        <div>
        <Row className="home-page-filters mx-1 mt-2">
            {/* organizations filter */}
            <Col xs={12} sm={4} className="d-flex align-items-end pl-2 pr-0">
            <Autocomplete
                name="tags"
                options={sorted}
                groupBy={(option) => option.category.toString()}
                getOptionLabel={(option) => (option.acronym.toString() || option.value.toString())}
                onChange={(e, value, _) => handleChange(value)}
                loading={tags.length === 0}
                renderInput={(params) => 
                    <TextField 
                        style={{}} 
                        {...params} 
                        margin="small" 
                    />}
                getOptionSelected={(option, value) => option.acronym === value.acronym}
                limitTags={1}
                
                // clearOnEscape
                multiple
            />
            </Col>
        </Row>
        </div>
    )
}



