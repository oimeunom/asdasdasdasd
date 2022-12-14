function send()
  {
    //Coloque o nome da variável que guarda as mensagens. Ela se chama 'msg'
  msg = document.getElementById("msg").value;
    //Utilize o código 'firebase.database().ref(room_name).push({ 'para que seja enviado ao firebase
    // o nome do usuário, a mensagem e quantidade de likes
    firebase.database().ref(room_name).push({
      name:user_name,
      message:msg,
      like:0
     });
  
    document.getElementById("msg").value = "";
  }
  
  function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
           firebase_message_id = childKey;
           message_data = childData;
  
           console.log(firebase_message_id);
             console.log(message_data);
             name = message_data['name'];
             message = message_data['message'];
           like = message_data['like'];
           name_with_tag = "<h4> "+ name +"<img class='user_tick' src='tick.png'></h4>";
           message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
  like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
           span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";
  
          row = name_with_tag + message_with_tag +like_button + span_with_tag;       
          document.getElementById("output").innerHTML += row;

        } });  }); }
  getData();
  
  function updateLike(message_id)
  {
    
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      //Utilize o código 'Number(likes) + 1;' para adicionar +1 like
      updated_likes =Number(likes) + 1;
      firebase.database().ref(room_name).child(message_id).update({
          like : updated_likes  
       });
  
  }
  
  function logout() {
    localStorage.removeItem("user_name");
    localstorage.removeItem("room_name");
    //Utilize o código que troca de tela
        window.location = "indexdoaluno";


  }
  