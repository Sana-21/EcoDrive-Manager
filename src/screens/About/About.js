import React from 'react';
import "./about.css";
import Header from '../../components/Header/Header';
import footer1 from '../../assets/images/footer1.png';
import footer2 from '../../assets/images/reduce-cost.png'
import footer3 from '../../assets/images/people.png'
import footer4 from '../../assets/images/money-transfer.png'
const AboutPage = () => {
    return (
        <div>
            <Header showSignIn={true} showSignUp={true} showOptions={true} />
            <div className="page-container">
                <div className="page-header">
                    <h2>About EcoDrive</h2>
                    <p>
                        The purpose of EcoDrive is to deploy a carpooling service exclusively for universities and workplaces
                        to reduce carbon emissions. Multiple people use different vehicles to commute through a similar route
                        on a daily basis. This results in significant costs, time waste, and air pollution.
                    </p>
                    <p>
                        The EcoDrive app provides an efficient commuting service allowing people to share rides and addressing
                        issues of traffic congestion, cost, and environmental pollution. The route optimization will make the commute
                        fast and easy. Moreover, the virtual wallet facility will provide convenient payment handling.
                    </p>
                    <p>
                        Commuting within the organization will provide a sense of security and community. Ultimately, our goal is to
                        ease the daily commute for the workers and students by streamlining their route, reducing cost, and, most importantly,
                        contributing to a greener and better future.
                    </p>
                </div>
                <div className="about-bottom">
                <h2 className="footer-heading">Why EcoDrive?</h2>
                    <footer className="footer-container">
                        <div className="footer-column">
                            <img className="footer-image" src={footer1} alt="Icon 1" />
                            <h4>Environmentally Friendly</h4>
                            <p>Discover the benefits of carpooling and its positive impact on the environment.</p>
                        </div>

                        <div className="footer-column">
                            <img className="footer-image" src={footer2} alt="Icon 2" />
                            <h4>Cost-Efficient</h4>
                            <p>Save money by sharing rides with others in your community or workplace.</p>
                        </div>

                        <div className="footer-column">
                            <img className="footer-image" src={footer3} alt="Icon 3" />
                            <h4>Community Driven</h4>
                            <p>Join a supportive community that values sustainable and efficient commuting.</p>
                        </div>

                        <div className="footer-column">
                            <img className="footer-image" src={footer4} alt="Icon 4" />
                            <h4>Convenient Payments</h4>
                            <p>Experience hassle-free payments with our virtual wallet facility.</p>
                        </div>
                    </footer>

                </div>
            </div>
        </div>
    );
};

export default AboutPage;
