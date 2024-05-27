import React, { useEffect, useState } from 'react';

const Transaction = () => {
  const [transactionsList, setTransactionsList] = useState([]);
  const [transactionOverview, setTransactionOverview] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState("Approver");
  const token = JSON.parse(localStorage.getItem('token'));



  useEffect(() => {
    const fetchTransactions = async () => {
      console.log("userRole", userRole)
      try {
        const response = await fetch(`http://localhost:3001/api/transactions/${userRole}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
        }); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("response data", data)

        setTransactionsList(data.list);
        setTransactionOverview(data.overview);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [token]); 


  useEffect(() => {
    const roleLocalStorage = localStorage.getItem('role');
    if (roleLocalStorage) {
      setUserRole(roleLocalStorage)
    }
  }, [userRole, setUserRole]);



  const showDetail = async (transaction, role, operation = "") => {
    console.log("masuk sini", role)
    if(role === 'Approver') {
      try {
        const response = await fetch(`http://localhost:3001/api/transactions/operation`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token 
          },
          body: JSON.stringify({
            role: role,
            referenceNo: transaction?.referenceNo,
            operation: operation
          })
        }); 
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("response data", data)

      } catch (err) {
    
      }
    }

    else {
      try {
        const response = await fetch(`http://localhost:3001/api/transactions/detail/${transaction?.referenceNo}`); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("response data", data)

        // setTransactionsList(data.list);
        // setTransactionOverview(data.overview);
        // setLoading(false);
      } catch (err) {
        // setError(err.message);
        // setLoading(false);
      }
    }
  }


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {console.log("user role", userRole, typeof userRole)}
        <div>
            <div>
                Awaiting Approval
                <p>{transactionOverview.AwaitingApproval}</p>
            </div>
            <div>
                Successful
                <p>{transactionOverview.Approved}</p>
            </div>
            <div>
                Rejected
                <p>{transactionOverview.Rejected}</p>
            </div>
        </div>

      <h1>Transaction List</h1>
      <table>
        <thead>
          <tr>
            <th>Reference No</th>
            <th>Transfer Amount</th>
            <th>Transfer Record</th>
            <th>From Account No</th>
            <th>Maker</th>
            <th>Transfer Date</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {transactionsList?.map((transaction) => (
            <tr key={transaction?.ReferenceNo}>
              <td>{transaction?.ReferenceNo}</td>
              <td>{transaction?.TransferAmount}</td>
              <td>{transaction?.TransferRecord}</td>
              <td>{transaction?.FromAccountNo}</td>
              <td>{transaction?.Maker}</td>
              <td>{transaction?.TransferDate}</td>
              <td onClick={()=> showDetail(transaction, userRole)}>
                {userRole === "Approver" ? <span>Approve Reject Detail</span> : <span>Detail</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transaction;
