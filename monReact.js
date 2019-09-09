console.log('Ca marche ?');

// Creation d'un composant REACT

class LikeButton extends React.Component{
    constructor(props){
        super(props); // Appel du constructeur de la classe parent (React)

        // Etat de la classe avec 2 propriétés (likes et isLiked)
        this.state = {
            likes: props.likes || 0,        // si props.likes est vide alors il vaudra 0 par défaut
            isLiked: props.isLiked || false // si propos.isLiked est vide alors il vaudra false par défaut
        };
    }

    handleClick(){
        //console.log(this);
        // On récup la valeur de isLiked
        const isLiked = this.state.isLiked; 
        console.log(isLiked); // retourne false si isLiked vaut 0, sinon retoune true
        // LOGIQUE DU LIKE : Si on click sur le 'like' on ajoute un like (il vaut 0 par défaut), 
        // mais si isLiked vaut true (qu'il à déja été liké) alors isLiked doit passé à false (voir LOGIQUE DISLIKE un peu plus bas)
        // (isLiked ? -1 : 1) TERNAIRE qui veut dire si isLiked vaut true (s'il existe) alors on retire un like (-1) sinon on ajoute 1 like
        const likes = this.state.likes + (isLiked ? -1 : 1); 

        // On met à jour l'état State (de notre constructor) pour que les ajouts ou suppression de like soit pris en compte
        this.setState({
            likes: likes, // likes devient likes (pas de changement)
            // LOGIQUE DU DISLIKE : si on clique sur un 'like' déja liké il se transforme en dislike (donc on retire un like) 
            // isLiked devient l'inverse (c'est un boolean) donc si isLiked valait false il vaudra true et inversement
            isLiked: !isLiked 
        });
    }

    render(){
        // Création d'un <button><i class="far fa-thumbs-up"></i>J'aime</button> 
        //            ou <button><i class="far fa-thumbs-up"></i>Je n'aime plus</button>
        return React.createElement(
            "button",
            {className: "btn btn-link like-in-react", onClick: () => this.handleClick()},
            this.state.likes, // le nombre de 'like' qu'il y a
            " ", // un espace

            // Création d'un balise "i" pour l'icon de like 
            React.createElement(
                "i", 
                // On change l'icon en fonction du isLiked (si isLiked vaut true on affiche le pouce rempli, sinon on affiche le pouce "vide")
                {className: this.state.isLiked ? "fas fa-thumbs-up" : "far fa-thumbs-up"} // fas fa-thumbs-up = pouce rempli, far fa-thumbs-up = pouce vide
            ),

            " ", // Un espace
            this.state.isLiked ? "Je n'aime plus !" : "J'aime !" // Si l'état de isLiked vaut true (déja liké) alors on affiche "je n'aime plus" sinon "j'aime"
        );
    }
}

console.log(LikeButton);

// On récup tout les éléments html 'span' qui ont la classe 'react-like', puis on boucle sur chacun des span
document.querySelectorAll('span.react-like').forEach(function(span){

    // On passe les attributs du span (qui possédent le nb de like et si isLiked soit "1" soit une chaîne de caractère vide)
    const likes = +span.dataset.likes; // en js pour récup un attribut de type data on utilise la propriété dataset et le "+" pour transformer en un entier

    const isLiked = +span.dataset.isLiked === 1;

    // ReactDOM permet de lié un composant REACT au DOM et de le rendre (ici on insére dans le DOM le bouton 'LikeButton' créé ci-dessus et on l'insère dans le span)
    //ReactDOM.render(React.createElement(LikeButton, likes={likes}, isLiked={isLiked}), span); 
    ReactDOM.render(React.createElement(LikeButton), span); 
    console.log(likes);
    console.log(isLiked);
});
