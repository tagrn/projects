import React from 'react';
import { Input } from 'antd';

function VideoContent(props) {
    const { TextArea } = Input;

    const onChange = e => {
        props.handlerContent(e.target.value);
    };
    return (
        <div>
            <TextArea
                className="video-upload-input"
                showCount
                maxLength={props.maxlength}
                onChange={onChange}
                rows={props.row}
            />
        </div>
    );
}

export default VideoContent;
