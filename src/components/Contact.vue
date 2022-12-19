<template>
  <div class="container">
    <h4>Si necesitas alguna otra opción en el menú, hazmelo saber a través de este formulario de contacto</h4>

<!-- Contact Form -->

<form action="#" method="post">

    <fieldset class="contact-form">

        <input type="text" name="name" placeholder="Nombre" required>
        <input type="email" name="email" placeholder="Email" required>
        <input type="text" name="subject" placeholder="Asunto" required>
        <textarea name="message" placeholder="Añade tu mensaje aquí" required></textarea>
        <input type="submit" id="submit" value="Enviar" >
      
    </fieldset>

</form>
  </div>
</template>
<script>
</script>
<style>
.container {
  color: #bfbfbf;
  min-width: 100%;
  border-radius: 15px;
  font-family: 'Lato', 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  background: rgba(245,245,245,1);
}

h1 {
  font-family: 'Pacifico', 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  text-align: center;
  text-shadow: 2px 2px 0px rgba(255,255,255,.7), 5px 7px 0px rgba(0, 0, 0, 0.1);
}

form {
  max-width: 600px;
  text-align: center;
  margin: 0 auto;
}

fieldset {
  border: 0;
  margin: 0;
  padding: 0;
}

.contact-form input,
.contact-form textarea {
  border: 0;
  outline: 0;
  display: block;
  width: 100%;
  margin-top: 1em;
  padding: .8em;
  font-family: 'Lato', 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 300;
  font-size: 14px;
  border-radius: 6px;
  box-shadow: 0 1px 1px rgba(34,34,34,0.1);
  resize: none;
}

.contact-form textarea {
  margin-bottom: 1em;
  height: 125px;
}

.contact-form input:focus {
  box-shadow: 0 0px 2px rgba(3,201,169,1)!important;
}

.contact-form textarea:focus {
  box-shadow: 0 0px 2px rgba(3,201,169,1)!important;
} 

#submit {
  color: white; 
  background-color: #bfbfbf;
  cursor: pointer;
  font-weight: 400;
}
    
#submit:hover {
  background-color: rgba(3,201,169,.6);
}
</style>