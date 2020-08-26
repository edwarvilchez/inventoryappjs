//alert("Prueba de vinculación");

//script para darle la funcionalidad requerida
class Product{
   constructor(name, price, year){
       this.name = name;
       this.price = price;
       this.year = year;
   } //cierre del constructor
}//cierre de la clase product

class UI{
    addProduct(product){
       const productList = document.getElementById('prod_list');
       const element = document.createElement('div');
       element.innerHTML = `
        <div class="card text-center mb-4">
            <div class="card-body">
                <strong>Nombre del Producto</strong>: ${product.name}
                <strong>Precio del Producto</strong>: ${product.price}
                <strong>Año del Producto</strong>: ${product.year}
                <a href="#" class="btn btn-danger" name="delete">Borrar</a>
            </div>        
        </div>       
       `;
       productList.appendChild(element);
    }

    resetForm(){
        document.getElementById('prod_form').reset();
    }

    deleteProduct(element){
        if(element.name === 'delete'){
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage('Producto Borrado con Éxito', 'danger');
        }
    }

    showMessage(message, cssClass){
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-4`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        container.insertBefore(div, app);
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 2000);
    }
}

//Eventos del DOM
document.getElementById('prod_form')
    .addEventListener('submit', function(e){
        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const year = document.getElementById('year').value;
        
        //mostramos en consola para testear
        //console.log(name, price, year);

        //creamos un nuevo producto
        const product = new Product(name, price, year);

        //creamos una instancia de UI
        const ui = new UI();
        if(name === '' || price === '' || year === '' ){
            return ui.showMessage('Los Campos son Obligatoarios', 'danger');
        }
        ui.addProduct(product);//agregamos el producto desde el front
        ui.resetForm();//limpiamos el formulario 
        ui.showMessage('Producto agregado con Éxito', 'success');

        //cancelamos el comportamiento por defecto
        e.preventDefault();
    });

    document.getElementById('prod_list').addEventListener('click', function(e){
       const ui = new UI();
       ui.deleteProduct(e.target);
    })


