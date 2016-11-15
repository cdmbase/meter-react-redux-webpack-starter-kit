import React from 'react';


const noFileOpened = "You have no open files";
const Tips = ({message}) => {

    return (
        <div className="tips-container">
            <div className="tips-list">
                <div className="tips-warning">
                    {message || noFileOpened}
                </div>
                <div className="tips-q">In the meantime, did you know
                    that you can: </div>

            </div>
        </div>
    )
};

export default Tips;