const HomePage = () => {

    return (
        <div className="home">
            <h2>Welcome to Survey App</h2>

            <div className="home-info">
                <p>Here Admin can create and edit surveys </p>
                <p>Admin can also follow the answer from statics page</p>
                <p>User can only answer and submit the survey questions</p>
            </div>
            <div className="home-contacts">
                <div><p> Contact information:
                    <span className="contacts-text">info@DAIS_J.com</span></p></div>
                <div><p> Programmers:
                    <span className="contacts-text">Yulia Kokorieva, Senja Ihalainen, Dmitry Sinyavskiy, Sakariye Aden, Ivan Kolesov</span></p></div>
            </div>

        </div>
    );
}

export default HomePage;