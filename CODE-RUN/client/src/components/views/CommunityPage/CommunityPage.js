import React from 'react';
import Footer from 'components/views/Footer/Footer';
import CommunityList from './Sections/CommunityList';

import './CommunityPage.css';

function CommunityPage() {
    return (
        <div>
            <div className="community-board">
                <h1 style={{ fontSize: 80 }}> 코드런 지식인</h1>
                <CommunityList />
            </div>
            <Footer></Footer>
        </div>
    );
}

export default CommunityPage;
