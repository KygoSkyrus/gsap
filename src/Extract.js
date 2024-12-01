import React, { useRef, useState } from 'react'

const Extract = () => {

  // const iRef = useRef();
  const [input, setInput] = useState(null)

  const extract = async () => {
    // console.log('curr',input)

    const url = "https://api.edenai.run/v2/workflow/a56ca44a-00a5-404e-babb-9444c5be6470/execution/"

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTdhYTc3YmUtNzQzZS00OTVkLWE4MmQtMjMwOWYyY2U1ZDJhIiwidHlwZSI6ImFwaV90b2tlbiJ9.ZnE9Njshc_DWMbp0SBxrYmTywtYV_htN1QgRX22FhiQ"
      },
      body: JSON.stringify(input)
    });
    const result = await response.json()

    console.log('result',result)
    // 4f13545a-7143-4a75-b154-42ec9a2b736c

    const execution_id = result || '4f13545a-7143-4a75-b154-42ec9a2b736c';
    const execUrl = `https://api.edenai.run/v2/workflow/a56ca44a-00a5-404e-babb-9444c5be6470/execution/${execution_id}/`

    const response1 = await fetch(execUrl, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTdhYTc3YmUtNzQzZS00OTVkLWE4MmQtMjMwOWYyY2U1ZDJhIiwidHlwZSI6ImFwaV90b2tlbiJ9.ZnE9Njshc_DWMbp0SBxrYmTywtYV_htN1QgRX22FhiQ"
      },
    });
    const result1 = await response1.json();
    console.log('result', result1)

  }


  return (
    <>
      <div>ThreeComp</div>

      <input type='file' value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={extract}>extract</button>
    </>
  )
}

export default Extract