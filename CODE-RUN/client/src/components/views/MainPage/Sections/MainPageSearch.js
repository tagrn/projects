import React, { useState } from 'react';
import { Input } from 'antd';

function MainPageSearch(props) {
    const { Search } = Input;
    const [SearchTerm, setSearchTerm] = useState('');

    const searchHandler = e => {
        setSearchTerm(e.currentTarget.value);
        props.refreshFunction(e.currentTarget.value);
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '300px',
            }}
        >
            <Search
                placeholder="input search text"
                onChange={searchHandler}
                style={{ width: 700 }}
                value={SearchTerm}
            />
        </div>
    );
}

export default MainPageSearch;
