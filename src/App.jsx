import { useState,useRef } from 'react'
import './App.css'

function App() {
  const [selectedTip, setSelectedTip] = useState();
  const [resetColor, setResetColor] =  useState(true);
  const [tip, setTip] = useState({
    amount : '0.00',
    perPerson : '0.00',
  });
  const [error, setError] = useState({
    amountError : false,
    perPersonError : false,
    amountErrorText : '',
    perPersonErrorText : '',
  });

  const inputRef = {
    bill : useRef(),
    customTip : useRef(),
    people : useRef(),
  };

  const tipped = (percentage) => {
    // e.preventDefault();
    setSelectedTip(percentage)
    setResetColor(false);

    let errors = {
      amountError : false,
      perPersonError : false,
      amountErrorText : '',
      perPersonErrorText : '',
    }

    if (percentage !== inputRef.customTip.current.value) {
      inputRef.customTip.current.value = '';
    };

    if ((inputRef.bill.current.value.trim() === '')  || (inputRef.bill.current.value.trim() == 0)) {
      errors.amountError = true;
      errors.amountErrorText = "Can't be zero";
    } else if ((inputRef.bill.current.value.trim() <= 0)) {
      errors.amountError = true;
      errors.amountErrorText = "Common 🤣, can't be negative";
    }

    if ((inputRef.people.current.value.trim() === '') || (inputRef.people.current.value.trim() == 0)) {
      errors.perPersonError = true;
      errors.perPersonErrorText = "Can't be zero";
    } else if ((inputRef.people.current.value.trim() <= 0)) {
      errors.perPersonError = true;
      errors.perPersonErrorText = "Negative?? 😅 Common";
    }

    setError((prevError) =>({
      ...prevError,
      ...errors
    }))

    if (
        (inputRef.bill.current.value.trim() === '') || 
        (inputRef.bill.current.value.trim() <= 0)  || 
        (inputRef.bill.current.value.trim() == 0) ||
        (inputRef.people.current.value.trim() === '') || 
        (inputRef.people.current.value.trim() <= 0) || 
        (inputRef.people.current.value.trim() == 0)
      ) {
        return;
      }

      const percentageNumberString = percentage.replace("%", "");
      const clickedNumber = Number(percentageNumberString);

      const billPerPerson = Number(inputRef.bill.current.value / inputRef.people.current.value);
      const tipPerPerson = Number(((clickedNumber / 100) * billPerPerson).toFixed(2));
      

      const totalBillPerPerson = Number((billPerPerson + tipPerPerson).toFixed(2));

      setTip({ amount : tipPerPerson, perPerson : totalBillPerPerson })
      
  };

  const reset = () => {
    setResetColor(true);
    setSelectedTip(null);
    setTip({ amount : '0.00', perPerson : '0.00' });
    setError({ amountError : false, perPersonError : false, amountErrorText : '', perPersonErrorText : ''})
    inputRef.bill.current.value = '';
    inputRef.people.current.value = '';
    inputRef.customTip.current.value = '';
  }

  return (
    <>
      <main>
        <h2 className="split">spli<br />tter</h2>
        <div className="container">
          <div className="calc">
              <form className={`first-form ${error.amountError ? 'error' : ''}`}>
                  <label htmlFor="bill">Bill</label>
                  {error.amountError && <p>{error.amountErrorText}</p>}
                  <img src="/icon-dollar.svg" />
                  <input onInput={() => setResetColor(false)} ref={inputRef.bill} type="number" id="bill" name="bill" placeholder='0' />
              </form>
              <section className="second-form">
                  <h2>Select Tip %</h2>
                  <div className="tip-button">
                      {['5%', '10%', '15%', '25%', '50%'].map((input) => (
                        <div key={input} className={input === selectedTip ? 'clicked' : ''} onClick={() => tipped(input)}>{input}</div>
                      ))}
                      <input onInput={() => tipped(inputRef.customTip.current.value)} ref={inputRef.customTip} id="custom" name="custom" type="number" placeholder="Custom" />
                  </div>
              </section>
              <form className={`third-form ${error.perPersonError ? 'error' : ''}`}>
                  <label htmlFor="People">Number of People</label>
                  {error.perPersonError && <p>{error.perPersonErrorText}</p>}
                  <img src="/icon-person.svg" />
                  <input onInput={() => setResetColor(false)} ref={inputRef.people} type="number" id="people" name="people" placeholder='0' />
              </form>
          </div>
          <div className="total">
              <section>
                  <div>
                      <h2>Tip Amount</h2>
                      <p>/ Person</p>
                  </div>
                  <h3>$<span className="person-tip-amount">{tip.amount}</span></h3>
              </section>
              <section>
                  <div>
                      <h2>Total</h2>
                      <p>/ Person</p>
                  </div>
                  <h3>$<span className="person-total">{tip.perPerson}</span></h3>
              </section>
              <button onClick={reset} className={`reset-button ${resetColor ? 'reset' : ''}`}>RESET</button>
          </div>
        </div>
      </main>
    </>
  )
}

export default App


//LEGEND.DEV coded this









































//Below is a more concise and professional way of building the above

// import { useState, useRef } from 'react';
// import './App.css';

// function App() {
//   const [selectedTip, setSelectedTip] = useState(null);
//   const [resetColor, setResetColor] = useState(true);
//   const [tip, setTip] = useState({ amount: '0.00', perPerson: '0.00' });
//   const [error, setError] = useState({ amountError: false, perPersonError: false, amountErrorText: '', perPersonErrorText: '' });

//   const inputRef = {
//     bill: useRef(),
//     customTip: useRef(),
//     people: useRef(),
//   };

//   const validateInput = () => {
//     const billValue = inputRef.bill.current.value.trim();
//     const peopleValue = inputRef.people.current.value.trim();

//     let validationErrors = { amountError: false, perPersonError: false, amountErrorText: '', perPersonErrorText: '' };

//     if (!billValue || billValue == 0) {
//       validationErrors.amountError = true;
//       validationErrors.amountErrorText = "Can't be zero";
//     } else if (billValue < 0) {
//       validationErrors.amountError = true;
//       validationErrors.amountErrorText = "Common 🤣, can't be negative";
//     }

//     if (!peopleValue || peopleValue == 0) {
//       validationErrors.perPersonError = true;
//       validationErrors.perPersonErrorText = "Can't be zero";
//     } else if (peopleValue < 0) {
//       validationErrors.perPersonError = true;
//       validationErrors.perPersonErrorText = "Negative?? 😅 Common";
//     }

//     setError(validationErrors);
//     return !validationErrors.amountError && !validationErrors.perPersonError;
//   };

//   const tipped = (percentage) => {
//     setSelectedTip(percentage);
//     setResetColor(false);

//     if (percentage !== inputRef.customTip.current.value) {
//       inputRef.customTip.current.value = '';
//     }

//     if (!validateInput()) return;

//     const tipPercentage = Number(percentage.replace('%', '')) || Number(inputRef.customTip.current.value);
//     const billPerPerson = Number(inputRef.bill.current.value) / Number(inputRef.people.current.value);
//     const tipAmount = ((tipPercentage / 100) * billPerPerson).toFixed(2);
//     const totalAmount = (billPerPerson + Number(tipAmount)).toFixed(2);

//     setTip({ amount: tipAmount, perPerson: totalAmount });
//   };

//   const reset = () => {
//     setResetColor(true);
//     setSelectedTip(null);
//     setTip({ amount: '0.00', perPerson: '0.00' });
//     setError({ amountError: false, perPersonError: false, amountErrorText: '', perPersonErrorText: '' });
//     Object.values(inputRef).forEach(ref => (ref.current.value = ''));
//   };

//   return (
//     <main>
//       <h2 className="split">spli<br />tter</h2>
//       <div className="container">
//         <div className="calc">
//           <form className={`first-form ${error.amountError ? 'error' : ''}`}>
//             <label htmlFor="bill">Bill</label>
//             {error.amountError && <p>{error.amountErrorText}</p>}
//             <img src="/icon-dollar.svg" alt="dollar icon" />
//             <input onInput={() => setResetColor(false)} ref={inputRef.bill} type="number" id="bill" placeholder="0" />
//           </form>

//           <section className="second-form">
//             <h2>Select Tip %</h2>
//             <div className="tip-button">
//               {['5%', '10%', '15%', '25%', '50%'].map((input) => (
//                 <div key={input} className={input === selectedTip ? 'clicked' : ''} onClick={() => tipped(input)}>
//                   {input}
//                 </div>
//               ))}
//               <input
//                 ref={inputRef.customTip}
//                 id="custom"
//                 type="number"
//                 placeholder="Custom"
//                 onInput={() => tipped(inputRef.customTip.current.value)}
//               />
//             </div>
//           </section>

//           <form className={`third-form ${error.perPersonError ? 'error' : ''}`}>
//             <label htmlFor="people">Number of People</label>
//             {error.perPersonError && <p>{error.perPersonErrorText}</p>}
//             <img src="/icon-person.svg" alt="person icon" />
//             <input onInput={() => setResetColor(false)} ref={inputRef.people} type="number" id="people" placeholder="0" />
//           </form>
//         </div>

//         <div className="total">
//           <section>
//             <div>
//               <h2>Tip Amount</h2>
//               <p>/ Person</p>
//             </div>
//             <h3>$<span className="person-tip-amount">{tip.amount}</span></h3>
//           </section>
//           <section>
//             <div>
//               <h2>Total</h2>
//               <p>/ Person</p>
//             </div>
//             <h3>$<span className="person-total">{tip.perPerson}</span></h3>
//           </section>
//           <button onClick={reset} className={`reset-button ${resetColor ? 'reset' : ''}`}>RESET</button>
//         </div>
//       </div>
//     </main>
//   );
// }

// export default App;
