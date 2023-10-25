import "./skeleton.css"
export const skeleton = () => {
 return `
  <div class="skeleton">
  <div class="skeleton-category-container">
   <ul class="skeleton-category">
      <li class="skeleton-category-container-list-item" data-category-id="3801" data-category-name="Color">
             <div class="image"></div>
             <p></p>
           </li>
           
           <li class="skeleton-category-container-list-item" data-category-id="3802" data-category-name="Alloys">
             <div class="image"></div>
             <p></p>
           </li>
   </ul>
 </div>
 <div class="skeleton-chat-container">
   <div class="skeleton-chat-header">
     <div class="chat-image"></div>
     <div class="chat-text">
       <h3></h3>
       <p></p>
     </div>
     <div class="chat-collapse"></div>
   </div> 
 </div>
 <div class="car-image-container">
      <div class="interior-image"></div>
    </div>
</div> 
`
}

