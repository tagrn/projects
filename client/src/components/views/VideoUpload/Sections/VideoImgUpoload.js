import React from 'react';
import Dropzone from 'react-dropzone';
import { PlusOutlined } from '@ant-design/icons';

function VideoImgUpoload() {
    return (
        <div>
            <h1>비디오</h1>
            <Dropzone>
                {({ getRootProps, getInputProps }) => (
                    <section>
                        <div
                            style={{
                                width: 300,
                                height: 200,
                                border: '1px solid lightgray',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1rem',
                            }}
                            {...getRootProps()}
                        >
                            <input {...getInputProps()} />
                            <PlusOutlined type="plus" style={{ fontSize: '3rem' }} />
                        </div>
                    </section>
                )}
            </Dropzone>
        </div>
    );
}

export default VideoImgUpoload;
