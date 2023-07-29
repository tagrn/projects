import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
// API
import { fetchSearchedVideoList, fetchLoginedSearchedVideoList } from '_api/Video.js';
import './NavBarSearch.css';
import { Input } from 'antd';

function NavBarSearch(props) {
    let user = useSelector(state => state.user);
    const history = useHistory();
    const user_id = user?.login?.user?.id;

    const { Search } = Input;
    const [SearchTerm, setSearchTerm] = useState('');

    const onChangeHandler = e => {
        setSearchTerm(e.currentTarget.value);
    };

    const onSearchHandler = () => {
        if (user_id) {
            fetchLoginedSearchedVideoList(user_id, SearchTerm, 1).then(res => {
                history.push({
                    pathname: '/class',
                    state: { playlist: res.data.data, search: SearchTerm },
                });
            });
        } else {
            fetchSearchedVideoList(SearchTerm, 1).then(res => {
                history.push({
                    pathname: '/class',
                    state: { playlist: res.data.data, cnt: res.data.page_cnt, search: SearchTerm },
                });
            });
        }
    };

    return (
        <div>
            <Search
                className="navbarInput"
                placeholder="검색어를 입력하세요"
                onChange={onChangeHandler}
                style={{ width: 200 }}
                value={SearchTerm}
                onSearch={onSearchHandler}
            />
        </div>
    );
}

export default NavBarSearch;
