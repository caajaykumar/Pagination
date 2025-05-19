import React, { useEffect, useState } from 'react';

const Employement = () => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const response = await fetch(
          'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
        );

        if (!response.ok) {
          throw new Error('Something went wrong');
        }

        const result = await response.json();
        setdata(result);
      } catch (error) {
        alert('Failed to fetch data');
        seterror(error.message);
      } finally {
        setloading(false);
      }
    };

    fetchData();
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(data.length / recordsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  if (loading) return <p data-testid="loading">Loading...</p>;
  if (error) return <p data-testid="error-message">Error: {error}</p>;

  return (
    <div className="table">
      <table data-testid="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((item) => (
            <tr key={item.id} data-testid="table-row">
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {data.length > 0 && (
        <div
          data-testid="pagination-controls"
          style={{ marginTop: '20px', textAlign: 'center' }}
        >
          <button onClick={goToPrevPage} disabled={currentPage === 1}>
            Prev
          </button>
          <span
            style={{
              margin: '0 10px',
              backgroundColor: 'rgb(0,152,121)',
              padding: '9px',
              color: '#fff',
              borderRadius: '4px',
            }}
          >
            {currentPage}
          </span>
          <button onClick={goToNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Employement;
