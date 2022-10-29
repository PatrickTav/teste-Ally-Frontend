import React, { useState } from 'react'
import {
  CForm,
  CAlert,
  CLabel,
  CInput,
  CContainer,
  CButton,
  CSelect,
} from './styled'

import Select from 'react-select'

import { useFetch } from '../../hooks/useFetch'

// HookForm e yup
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import schema from './validation'

// endpoints para request
const urlCounty = 'https://amazon-api.sellead.com/country'
const urlCity = 'https://amazon-api.sellead.com/city'

function Form() {
  const [dataCity, setDataCity] = useState([])
  const [selectedCountry, setSelectedCountry] = useState([])
  const [selectedCities, setSelectedCities] = useState([])

  // Uso do custom hook useFetch
  const { data: dataCountry } = useFetch(urlCounty)
  const { data: dataCities } = useFetch(urlCity)

  // uso do hookForm
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    console.log(data.selectACity)
    // Estrutura para caso tivesse um backend:
    reset({
      name: '',
      email: '',
      phone: '',
      cpf: '',
      countrys: '',
      cities: '',
    })
  }

  const optionsCountrys =
    dataCountry &&
    dataCountry.map((country) => ({
      value: country.code,
      label: country.name,
    }))
  const optionsCities =
  dataCity &&
  dataCity.map((country) => ({
      value: country.country_code,
      label: country.name,
    }))

  //Função para filtrar as cidades por País no select cities
  const handleFilterCityByCountry = (e) => {
    
    setSelectedCountry(e)
    
    const filterCityByCode = dataCities.filter(
      ({ country_code }) => {
        if (e.length===0) {
          
          return dataCity
        }
        return country_code === e[e.length - 1].value
      }
      )
      
      setDataCity(filterCityByCode)

    
  }
  
 
  return (
    <CContainer>
      <CForm action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="personal_data">
          <CLabel>
            Nome:
            <br />
            <CInput
              type="text"
              {...register('name')}
              placeholder="ex: Ally Hub"
            />
            <CAlert>{errors.name?.message}</CAlert>
          </CLabel>
          <CLabel>
            Email:
            <br />
            <CInput
              type="email"
              {...register('email')}
              placeholder="ex: ally@gmail.com"
            />
            <CAlert>{errors.email?.message}</CAlert>
          </CLabel>
          <CLabel>
            Telefone:
            <br />
            <CInput
              type="number"
              {...register('phone')}
              placeholder="ex: (99)99999-9999"
            />
            <CAlert>{errors.phone?.message}</CAlert>
          </CLabel>
          <CLabel>
            CPF:
            <br />
            <CInput type="number" {...register('cpf')} />
            <CAlert>{errors.cpf?.message}</CAlert>
          </CLabel>
        </div>

        <div className="places_data">
          <CLabel>
            País:
            <br />
            <Select
              className='select'
              options={optionsCountrys}
              isMulti
              onChange={handleFilterCityByCountry}
              {...register('countrys')}
            />
            {/* <CSelect
              onInput={handleFilterCityByCountry}
              name="selectACountry"
              {...register('countrys')}
            >
              {dataCountry &&
                dataCountry.map(({ code, name, name_ptbr }) => (
                  <option key={name} value={code}>
                    {name_ptbr}
                  </option>
                ))}
            </CSelect> */}
            <CAlert>{errors.countrys?.message}</CAlert>
          </CLabel>

          <CLabel>
            Cidade:
            <br />


            <Select
              className='select'
              options={optionsCities}
              isMulti
              onChange={(e) => setSelectedCities(e)}
              {...register('cities')}
            />
            {/* <CSelect name="selectACity" {...register('cities')}>
              {!dataCity || dataCity.length === 0 ? (
                <option value="">Sem destino para esse País </option>
              ) : (
                dataCity.map(({ id, country_code, name }) => (
                  <option key={id} value={country_code}>
                    {name}
                  </option>
                ))
              )}
            </CSelect> */}
            <CAlert>{errors.cities?.message}</CAlert>
          </CLabel>
        </div>
        <CButton>Enviar</CButton>
      </CForm>
    </CContainer>
  )
}

export default Form
