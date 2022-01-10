document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app();
    console.log(app);
});

function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
        .then(result => {
            const user = result.user;
            console.log(user);
            getPrj(user);
        })
        .catch(console.log);
}

function getPrj(user) {
    document.write("Hello " + user.displayName);

    const app = firebase.app();

    const db = firebase.firestore();

    const prj = db.collection('projects');

    const query = prj.where('owner', '==', user.uid);

    query.get()
        .then(projects =>{
            console.log(projects);
            projects.forEach(doc =>{
                data = doc.data();
                document.write("Project name : " + data.name);
                data.rooms.forEach(room=>{
                    document.write("Room name : " + room.name);
                })
            })
        })
}