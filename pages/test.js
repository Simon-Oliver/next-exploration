import React from 'react';
import style from './test.module.css';

export default function dashboard() {
  return (
    <>
      <div className={style.item1}>Item 1</div>
      <div className={style.item2}>Item 2</div>
      <div className={style.item3}>Item 3</div>
    </>
  );
}
