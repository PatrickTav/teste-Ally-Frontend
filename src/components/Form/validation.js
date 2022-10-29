import * as yup from 'yup'


// esquema para a validação do form
const schema = yup
  .object({
    name: yup.string().min(3,'Campo Obrigatório').required('Campo Obrigatório'),
    email: yup
      .string()
      .email('Insira um email válido')
      .required('Campo Obrigatório'),
    phone: yup.string().required('insira um número válido'),
    cpf: yup
      .string()
      .max(11, 'O maximo de um cpf são 11 números')
      .min(11, 'O minimo de um cpf são 11 números')
      .required('Insira um cpf válido'),
    // countrys: yup.object().shape({
    //     label: yup.string(),
    //     value: yup.string()
    //   }),
    // cities: yup.object().shape({
    //     label: yup.string(),
    //     value: yup.string()
    //   }),      
  })
  .required()

  export default schema