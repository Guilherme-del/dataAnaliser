import styled from "styled-components";

let colors = {
  primaryColor: '#00b8e2',
  secundaryColor:'#00404f',
  bgColor:'#f5f6f7',
  fontColor:'#424242'
}

export const Main = styled.section
`
margin: 0;
padding: 0;
box-sizing: border-box;
text-align: center;
`;

export const Form = styled.section 
`display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
margin-top: 0;
display: flex;
padding: 1rem;
background-color: ${colors.primaryColor};
margin-bottom: 1rem;
`;

export const Fields = styled.section
`    
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
`;

export const Input = styled.input
`background-color: ${colors.bgColor};
padding: 0.5rem 1rem;
border: 1px solid ${colors.secundaryColor};
display: block;
margin: 0.3rem 1rem 0 0;
display: flex;
color: ${colors.secundaryColor};
justify-content: center;
align-items: center;
flex-direction: row;

::placeholder,
::-webkit-input-placeholder {
  color: ${colors.secundaryColor};
}
&:focus {
  outline: none;
  border-color: ${colors.secundaryColor};
}
`;

export const PrimaryText = styled.h1
`
font-weight: bolder;
`;

export const SecondaryText = styled.h2
`
font-weight: normal;
`;

export const DataInfo = styled.section
`
display: flex;
min-width: 100%;
`;

export const TableStyle = styled.div
`
flex:1;
margin-left: 10%;
max-width: 50%;
margin-top:3%;
`;

export const ChartComponent = styled.div
`
margin-left: 10%;
max-width: 20%;
`;

export const Button = styled.button
`
background: ${colors.primaryColor};
color: ${colors.bgColor};
border: 1px solid ${colors.bgColor};
font-size: large;
font-weight: bolder;
padding: 1.2rem 1rem;
display: block;
margin: 0.3rem 1rem 0 0;
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
`;
