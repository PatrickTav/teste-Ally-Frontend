import styled from 'styled-components'

export const CForm = styled.form`
  display: grid;
  /* gap: 20px; */
  padding: 20px 21px;
  font-weight: 400;
  font-size: 1.1rem;
  grid-template-areas:
    'personal place'
    'button button';
  color: #fff;

 .select{
  color: #000;
 }
  .personal_data,
  .places_data {
    display: flex;
    width: 300px;
    flex-direction: column;
    gap: 20px;
    /* border: 1px solid #ddd; */
    padding: 20px;
  }
  .personal_data {
    grid-area: personal;
    background: rgb(8, 177, 151);
    background: linear-gradient(
      360deg,
      rgba(0, 174, 116, 1) 1%,
      rgba(8, 177, 151, 1) 41%
    );
    border-radius: 10px 0 0 10px;
    padding-bottom:2.5rem ;
  }
  .places_data {
    grid-area: place;
    background: rgb(8, 177, 151);
    background: linear-gradient(
      180deg,
      rgba(8, 177, 151, 1) 41%,
      rgba(0, 174, 116, 1) 100%
    );
    border-radius: 0 10px 10px 0;
  }
`
export const CSelect = styled.select`
  width: 100%;
  margin-top: 0.5rem;
  border-radius: 0.4rem;
  border: none;
  padding: 0.3rem 0.5rem;
`

export const CContainer = styled.section`
  max-width: 960px;
  margin: 3rem auto;
`
export const CAlert = styled.p`
  color: #f04;
  font-size: 0.8rem;
  position: absolute;
`
export const CLabel = styled.label`
  width: 100%;
  padding: 0.2rem 0.2rem;
`
export const CInput = styled.input`
  width: 100%;
  margin-top: 0.5rem;
  border-radius: 0.4rem;
  border: none;
  padding: 0.3rem 0.5rem;
`

export const CButton = styled.button`
  padding: 0.2rem 0.4rem;
  background-color: rgb(8, 177, 151);
  grid-area: button;
  width: 10rem;
  margin: auto;
  margin-top: 2rem;
  cursor: pointer;
  padding: 0.5rem 3rem;
  text-align: center;
  border: none;
  color: #fff;
  font-size: 1.3rem;
  font-weight: 700;
  border-radius: 5px;

  :hover {
    background: linear-gradient(
      90deg,
      rgba(26, 177, 8, 1) 41%,
      rgba(0, 174, 116, 1) 100%
    );
  }
`
