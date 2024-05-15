import './Dashboard.scss';
import { getOverview } from '../../../services/apiServices';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
const Dashboard = (props) => {
    const [dataOverview, setDataOverview] = useState([]);
    const [dataChart, setDataChart] = useState([]);

    useEffect(() => {
        document.title = 'Dasboard Admin';
        fetchDataOverview();
    }, []);

    const fetchDataOverview = async () => {
        let res = await getOverview();
        if (res && res.EC === 0) {
            setDataOverview(res.DT);

            //process chart data
            let QZ,
                QS,
                AS = 0;
            QZ = res.DT.others.countQuiz;
            QS = res.DT.others.countQuestions;
            AS = res.DT.others.countAnswers;
            const data = [
                {
                    name: 'Quizzes',
                    QZ: QZ,
                },
                {
                    name: 'Questions',
                    QS: QS,
                },
                {
                    name: 'Answers',
                    AS: AS,
                },
            ];

            setDataChart(data);
        }
    };

    return (
        <div className="dashboard-container">
            <div className="title">analytics Dasboard</div>
            <div className="content">
                <div className="c-left">
                    <div className="child">
                        <span className="text-1">Total users</span>
                        <span className="text-2">
                            {dataOverview && dataOverview.users && dataOverview.users.total ? (
                                <>{dataOverview.users.total} </>
                            ) : (
                                <>0</>
                            )}
                        </span>
                    </div>
                    <div className="child">
                        {' '}
                        <span className="text-1">Total Quizzess</span>
                        <span className="text-2">
                            {' '}
                            {dataOverview && dataOverview.others && dataOverview.others.countQuiz ? (
                                <>{dataOverview.others.countQuiz} </>
                            ) : (
                                <>0</>
                            )}
                        </span>
                    </div>
                    <div className="child">
                        {' '}
                        <span className="text-1">Total Questions</span>
                        <span className="text-2">
                            {dataOverview && dataOverview.others && dataOverview.others.countQuestions ? (
                                <>{dataOverview.others.countQuestions} </>
                            ) : (
                                <>0</>
                            )}
                        </span>
                    </div>
                    <div className="child">
                        {' '}
                        <span className="text-1">Total Answers</span>
                        <span className="text-2">
                            {' '}
                            {dataOverview && dataOverview.others && dataOverview.others.countAnswers ? (
                                <>{dataOverview.others.countAnswers} </>
                            ) : (
                                <>0</>
                            )}
                        </span>
                    </div>
                </div>
                <div className="c-right">
                    <ResponsiveContainer width="95%" height={'100%'}>
                        <BarChart data={dataChart}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="QZ" fill="#8884d8" />
                            <Bar dataKey="QS" fill="#82ca9d" />
                            <Bar dataKey="AS" fill="#fcb12a" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
