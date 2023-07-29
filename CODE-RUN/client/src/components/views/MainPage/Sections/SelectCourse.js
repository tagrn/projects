import React from 'react';
import { Card } from 'react-bootstrap';
import AlgoImage from '../images/ALGO.png';
import CSImage from '../images/CS.png';
import './SelectCourse.css';

function SelectCourse(props) {
    const gotoClass = function () {
        props.history.push('/class');
    };
    return (
        <div className="SelectCourse">
            <h1 className="SelectCourses">원하는 과목을 수강하세요!</h1>
            <div className="Courses">
                <Card className="Course" onClick={() => gotoClass()}>
                    <Card.Img className="CourseImage" src={AlgoImage} />
                    <Card.Title className="CourseTitle">알고리즘</Card.Title>
                    <Card.Text className="CourseContent">문제 해결 능력을 함양해 보세요!</Card.Text>
                </Card>
                <Card className="Course" onClick={() => gotoClass()}>
                    <Card.Img className="CourseImage" src={CSImage} />
                    <Card.Title className="CourseTitle">CS</Card.Title>
                    <Card.Text className="CourseContent">SW 필수 지식을 습득해 보세요!</Card.Text>
                </Card>
            </div>
        </div>
    );
}

export default SelectCourse;
