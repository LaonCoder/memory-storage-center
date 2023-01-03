/* components/CheckBox.js */

import React from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import styles from './CheckBox.module.css';
import classNames from 'classnames/bind';

// classnames의 bind 기능을 사용하면, 
// CSS 클래스 이름을 지정해 줄 때 cx('클래스이름')과 같은 형식으로 쉽게 지정할 수 있다.
const cx = classNames.bind(styles);

function CheckBox({ children, checked, ...rest }) {
    return (
        <div className={cx('checkbox')}>
            <label>
                <input type="checkbox" checked={checked} {...rest} />
                <div className={cx('icon')}>{checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}</div>
            </label>
            <span>{children}</span>
        </div>
    );
}

export default CheckBox;