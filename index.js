import express from "express";
import bodyParser from "body-parser";
import _ from "lodash";

const app = express();
const port = 3000;

const blogPost = [
    {
    id: 1,
    title: "A Journey Through Time: Exploring Ancient Ruins",
    content: "Embarking on a journey through the Andes, I found myself on a train winding through lush landscapes, bound for one of the world's most iconic archaeological sites—Machu Picchu. The air was filled with anticipation as I stepped into the ancient citadel, marveling at the precision of Incan engineering and the stunning panoramic views. Join me on this adventure as we unravel the secrets of Machu Picchu and connect with the rich history of this sacred place."
},

    {
    id: 2,
    title: "Embracing Change: A Year of Personal Growth",
    content: "As the seasons changed, so did my life. In 'Rediscovering Myself in the Midst of Change,' I open up about a year of significant transitions. From leaving a familiar job to relocating to a new city, each change brought a mix of uncertainty and opportunity. Join me as I share the moments of self-doubt, the lessons learned, and the unexpected joys that came with embracing change. This is a story of resilience, growth, and the beauty of finding oneself in the midst of life's twists and turns."
}
];


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


app.get("/", (req, res) => {
    res.render("index", { blogPost });
});

app.get("/compose", (req, res) => {
    res.render("compose", { blogPost });
});

app.get("/edit/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const postToEdit = blogPost.find(post => post.id === postId);
    res.render("edit", { post: postToEdit});
});

app.post("/edit/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const updatedTitle = req.body.title;
    const updatedContent = req.body.content;

    const postToEdit = blogPost.find(post => post.id === postId);
    postToEdit.title = updatedTitle;
    postToEdit.content = updatedContent;

    res.redirect("/");
});

app.post("/compose", (req, res) => {
    const { title, content } = req.body;
    const newPost = {
        id: blogPost.length + 1,
        title,
        content
    };
    blogPost.push(newPost);
    
    res.redirect("/");
}) 

app.get("/posts/:postName", (req, res) => {
const storedSlot = _.lowerCase(req.params.postName);

blogPost.forEach(post => {
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === storedSlot) {
    res.render("posts", {
        title: post.title,
        content: post.content
    });
    }
});
});

app.get("/delete/:id", (req,res) => {
    const postId = parseInt(req.params.id);

    const indexToRemove = blogPost.findIndex(post => post.id === postId);
    if (indexToRemove !== -1) {
        blogPost.splice(indexToRemove, 1);
    }

    res.redirect("/");
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

