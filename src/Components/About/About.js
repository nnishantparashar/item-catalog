import Header from "../Header/Header";

const About = () => {
    return (
        <div>
            <Header/>
            <img src={window.location.origin + `/img/under-construction.png`} />
            <h3>Comming Soon...</h3>
        </div>
    )
}

export default About;