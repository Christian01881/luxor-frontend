<template>
<section class="p-5 text-white bg-black vh-100">
<h2 class="h1-responsive font-weight-bold text-center my-4 title">Contattace</h2>
<p class="text-center w-responsive mx-auto mb-5">Hai delle domande? Non esitare a contattarci direttamente. Il nostro team ti risponderà entro poche ore per aiutarti.</p>

<div class="row">

    <div class="col-md-9 mb-md-0 mb-5">
        <form id="contact-form" name="contact-form" action="mail.php" method="POST">
            <div class="row">
                <div class="col-md-6">
                    <div class="md-form mb-4">
                         <label for="name" class="">Nome</label>
                        <input type="text" id="name" name="name" class="form-control">
                       
                    </div>
                </div>
                

                
                <div class="col-md-6">
                    <div class="md-form mb-4">
                          <label for="email" class="">E-mail</label>
                        <input type="text" id="email" name="email" class="form-control">
                      
                    </div>
                </div>
            </div>
            <div class="row">

                
                <div class="col-md-12">

                    <div class="md-form mb-5">
                        <label for="message">Il tuo messaggio</label>
                        <textarea type="text" id="message" name="message" rows="2" class="form-control md-textarea"></textarea>
                        
                    </div>

                </div>
            </div>

        </form>

        <div class="text-center text-md-left">
            <a class="btn btn-warning " onclick="document.getElementById('contact-form').submit();">Invia</a>
        </div>
        <div class="status"></div>
    </div>
    
    <div class="col-md-3 text-center">
        <ul class="list-unstyled mb-0">
            <li><i class="fas fa-map-marker-alt fa-2x title"></i>
                <p>Milan, MI 20019 , ITALY</p>
            </li>

            <li><i class="fas fa-phone mt-4 fa-2x title"></i>
                <p>+ 388 3478934</p>
            </li>

            <li><i class="fas fa-envelope mt-4 fa-2x title"></i>
                <p>contact@gmail.com</p>
            </li>
        </ul>
    </div>
</div>

</section>

</template>

<script>
    export default {

    }
</script>

<style lang="scss" scoped>

.title{
    color: #fed200 ;
}



</style>