import React, { useEffect, useState } from 'react';

const Memos = ({state}) => {
  const [memos,setMemos]= useState([]);
  const {contract}= state;
  useEffect(()=>{
    const memosMesssage =async ()=>{
      const memo = await contract.getMemo();
      setMemos(memo)
    };
    contract && memosMesssage();
  },[contract]);

  const style = {
    textAlign:"center",
    backgroundColor: "#96D4D4",
    border: "1px solid white",
    borderCollapse: "collapse",
    padding: "7px",
  };
  
  return (
    <div >
      <p style={{textAlign:"center",marginTop:"20px"}}>
        Message
      </p>
      {memos.map((memo)=>{
        return (
          <div
            className="container-fluid"
            style={{ width: "100%" }}
            key={Math.random()}
          >
            <table style={{ marginBottom: "10px" }}>
              <tbody>
                <tr>
                  <td style={style} width="120px">
                    {memo.name}
                  </td>
                  <td className="hero" style={style} width="800px">
                    {new Date(memo.timestamp * 1000).toString()}
                  </td>
                  <td className="hero" style={style} width="300px">
                    {memo.description}
                  </td>
                  <td style={style} width="500px">
                    {memo.from}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  )
}

export default Memos;