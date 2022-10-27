import styled from 'styled-components'

export const CForm = styled.form`
  display: flex;
  gap: 200px;
  padding: 50px 20px;
  flex-wrap: wrap;
  font-weight: 400;
  font-size: 1.1rem;

  .personal_data,
  .places-data {
    display: flex;
    width: 300px;
    flex-direction: column;
    gap: 20px;
    border: 1px solid #ddd;
    padding: 20px;
    border-radius: 5px;
  }

  .personal_data input,
  .places-data select {
    padding: 5px 10px;
    width: 100%;
    border-radius: 5px;
    border: none;
  }
`
