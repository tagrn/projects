import React, { useState, useEffect } from 'react';
import './UserInfoUpdate.css';
import Footer from 'components/views/Footer/Footer';
import { useDispatch } from 'react-redux';
import { updateUser } from '_actions/user_actions';

function UserInfoUpdate(props) {
    const [File, setFile] = useState([]);
    const [PreviewUrl, setPreviewUrl] = useState('');
    const dispatch = useDispatch();
    const [UpdateNickname, setUpdateNickname] = useState(props.user.login.user.name);
    const [UpdatePassword, setUpdatePassword] = useState('');
    const [UpdatePasswordConfirm, setUpdatePasswordConfirm] = useState('');
    const [HashPasswordConfirm, setHashPasswordConfirm] = useState('');

    useEffect(() => {
        const date = new Date();
        setPreviewUrl(props.user.login.user.profile + '?' + date);
    }, []);
    const passwordHandler = event => {
        let pw = event.currentTarget.value;
        setUpdatePassword(pw);
    };

    const passwordConfirmHandler = event => {
        const pwconfirm = document.getElementsByClassName('update-password-confirm');
        let pw = event.currentTarget.value;
        setUpdatePasswordConfirm(pw);
        const sha = require('sha256');
        if (UpdatePassword === pw) {
            setHashPasswordConfirm(sha(pw));
            pwconfirm[0].style.backgroundColor = '#eee';
        } else {
            pwconfirm[0].style.backgroundColor = '#ffdcdc';
        }
    };
    const NicknameHandler = event => {
        let name = event.currentTarget.value;
        setUpdateNickname(name);
    };

    const submitInfo = () => {
        if (HashPasswordConfirm.length === 0 || UpdateNickname.length === 0 || !File) {
            alert('데이터를 모두 넣어주세요.');
        } else {
            const body = { password: HashPasswordConfirm, name: UpdateNickname };
            let formData = new FormData();
            formData.append('file', File);

            dispatch(updateUser(body))
                .then(res => {
                    props.history.push(`/profile/${props.user.login.user.id}`);
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div>
            <div class="update-container">
                <div class="user-update-container">
                    <h1>Update User Info</h1>
                    <input
                        defaultValue={props.user.login.user.name}
                        class="update-nickname"
                        onChange={NicknameHandler}
                    />
                    <input
                        type="password"
                        placeholder="새로운 비밀번호"
                        class="update-password"
                        onChange={passwordHandler}
                    />
                    <input
                        type="password"
                        placeholder="새로운 비밀번호 확인"
                        class="update-password-confirm"
                        onChange={passwordConfirmHandler}
                    />
                    <button onClick={submitInfo}>submit</button>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default UserInfoUpdate;
