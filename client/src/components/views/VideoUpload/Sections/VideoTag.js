import React from 'react';
import '../VideoUpload.scss';

function VideoTag(props) {
    const animateButton = e => {
        e.preventDefault();

        e.target.classList.remove('animate');

        e.target.classList.add('animate');
        setTimeout(function () {
            e.target.classList.remove('animate');
        }, 700);
    };

    const handleTag = e => {
        const id_tag = props.tag_id;
        props.handlerTag(e, id_tag);
    };

    var bubblyButtons = document.getElementsByClassName('bubbly-button');

    for (var i = 0; i < bubblyButtons.length; i++) {
        bubblyButtons[i].addEventListener('click', animateButton, false);
    }

    return (
        <div class="videotag-container" onClick={handleTag}>
            <button class="bubbly-button" onClick={animateButton}>
                {props.tag}
            </button>
        </div>
    );
}

export default VideoTag;
