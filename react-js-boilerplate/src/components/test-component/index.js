/* eslint-disable import/no-named-as-default-member */
import React, { useState } from "react";
import Display from "./Display";
import ButtonPanel from "./ButtonPanel";
import calculate from "../../helpers/calculate";

function TestComponent() {
    const [state, setState] = useState({
        total: null,
        next: null,
        operation: null,
    });

    const handleClick = (buttonName) => {
        setState({ ...state, ...calculate(state, buttonName) });
    };

    return (
        <div>
            <div>
                <div>UNIT TEST</div>
                <div className="component-app">
                    <Display value={state.next || state.total || "0"} />
                    <ButtonPanel clickHandler={handleClick} />
                </div>
            </div>
        </div>
    );
}

export default TestComponent;
