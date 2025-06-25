

export async function getAllArticles(token){
    console.log("inside methode", token)
    const response = await fetch(
        '/pharm/api/get_all_articles/',
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

export async function getSelectedArticle(token, id){

    const response = await fetch(
      '/pharm/api/get_selected_article/'+id,
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
    return "no data";
  }

};


export async function addNewArticle(token, data){
  console.log("inside methode", token)
  const response = await fetch(
      '/pharm/api/add_article/',
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
    console.log("status 200, response: ", JSON.parse(text));
    return JSON.parse(text);
  } else {
    console.log("failed", text);
    return "error";
  }

};


export async function updateArticle(token, data, id){
  console.log("inside methode", token)
  const response = await fetch(
      '/pharm/api/update_article/'+id,
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
  if (response.status === 200) {
    console.log("status 200, response: ", JSON.parse(text));
    return JSON.parse(text);
  } else {
    console.log("failed", text);
    return "error";
  }

};


export async function deleteArticle(token, id){
  console.log("inside methode", token)
  const response = await fetch(
      '/pharm/api/delete_article/'+id,
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



export async function getAllArticleNames(token){
  console.log("inside methode", token)
  const response = await fetch(
      '/pharm/api/get_all_articles_names/',
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

export async function getAllArrivageOfMedic(token, medic_id){
  console.log("inside methode", token)
  const response = await fetch(
      '/pharm/api/get_all_arivage_of_medic/'+medic_id,
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





