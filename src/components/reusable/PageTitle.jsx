function PageTitle({ children, description }) {
    return (
        <div className="header-wrapper">
            <h1 className="main-header">{children}</h1>
            <p className="main-header-description">{description}</p>
        </div>
    );
}

export default PageTitle;
