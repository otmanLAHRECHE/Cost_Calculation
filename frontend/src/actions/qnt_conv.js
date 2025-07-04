export async function getAllQntConvByYear(token, year){
    console.log("inside methode", token)
    const response = await fetch(
        '/pharm/api/get_all_qnt_conv_by_year/' + year,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' +token,
          },
          body: JSON.stringify()
        }
    );
    const text = await response.text();
    if (response.status === 200) {
      console.log("get the data succesfully", JSON.parse(text));
      return JSON.parse(text);
    } else {
      console.log("failed", text);
      Object.entries(JSON.parse(text)).forEach(([key, value]) => {
        fail(`${key}: ${value}`);
      });
      return "no data";
    }
  
  };


export async function generateState(token, year){
      console.log("inside methode", token)
      const response = await fetch(
          '/pharm/api/generate_qnt_conv_by_year/'+year,
          {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Token ' +token,
            },
            body: JSON.stringify()
          }
      );
      const text = await response.text();
      if (response.status === 201) {
        console.log(JSON.parse(text));
        return JSON.parse(text);
      } else {
        console.log("failed", text);
        return "error";
      }
    
    };


    export async function deleteQntCov(token, year){
  console.log("inside methode", token)
  const response = await fetch(
      '/pharm/api/delete_qnt_conv_by_year/'+year,
      {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Token ' +token,
        },
        body: JSON.stringify()
      }
  );
  const text = await response.text();
  if (response.status === 200) {
    console.log("status 200, response: ", JSON.parse(text));
    return JSON.parse(text);
  } else {
    console.log("failed", text);
    return "error";
  }

};


export async function saveStateQntConvF(token, data){
      console.log("inside methode", token)
      const response = await fetch(
          '/pharm/api/save_qnt_conv_by_year/',
          {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Token ' +token,
            },
            body: data
          }
      );
      const text = await response.text();
      if (response.status === 201) {
        console.log(JSON.parse(text));
        return JSON.parse(text);
      } else {
        console.log("failed", text);
        return "error";
      }
    
    };