const express = require('express');
const fixArrayId = require('../helpers');
const app = express.Router();


let testimonials = [
    {id: 1, name: "Zharne", img: "https://i.postimg.cc/gJgrdqqj/zharnetestimonial.jpg", details: "Amaarah produces good work and works well in a team. She is a committed developer and a problem solver."},
    {id: 2, name: "Dale", img: "https://i.postimg.cc/bJgSrj8z/daletestimonial.jpg", details: "A fierce friend and diligent worker, always ready to do what she needs to do to get the job done. A welcome and much-needed addition to any team she finds herself on, Amaarah has an uncanny ability to put those around her at ease with her laid-back nature."},
    {id: 3, name: "Kyle", img: "https://i.postimg.cc/gjBwyqnQ/kyletestimonial.jpg", details: "Amaarah is a pleasure to work with lightening up the mood where ever she goes ,while keeping the hard-working attitude."},
    {id: 4, name: "Alex", img: "https://i.postimg.cc/CKYKq6cd/alextestimonial.jpg ", details: "Amaarah is cheerful and committed to the work she does. She has the potential to do many great things."},
    {id: 5, name: "Leigh-Ann", img: "https://i.postimg.cc/hPfQDwYB/leighanntestimonial.jpg", details: "Amaarah is a very kind and caring person. She takes on challenges full handed and always do her best. She is a extremely hard worker . She is a person who will try her best to help other and she is very open minded.She enjoys her work."},
    {id: 6, name: "Dalarno", img: "https://i.postimg.cc/BnPFgy5g/dalarnotestimonial.jpg", details: "Amaarah has a personality that is so unique and vibrant, it'll brighten up any work enviroment she proceeds to be a part of. She has the ability to excell in any field she wants as she has a work ethic comparable to that of a lioness, always fierce. She grabs any opportunity that she gets with both arms because her work-ethic exceeds the expectations of her colleagues everyday."}
    
];




app.get('/', (req, res) => {
    res.send(testimonials)
})

app.get('/:id', (req, res) => {
    const testimonial = testimonials.find((testimonial) => testimonial.id == req.params.id) 
    if (!testimonial) res.status(404).send({ msg: "Testimonial not found"});
    res.send(testimonial);
});

// CREATE A TESTIMONIAL (push to array)
app.post('/', (req, res) => { 
    let { title, img, details, github, live } = req.body;
    if (!title || !img || !details || !github || !live)
      res.status(400).send({ msg: "Not all information sent"});
    let newTestimonial = {
        id: testimonials.length + 1,
        title,
        img,
        github,
        live,
    };
    testimonials.push(newTestimonial);
    res.send(newTestimonial);
});

// UPDATE A TESTIMONIAL (update item in array)
app.put("/:id", (req, res) => {
    // FIND TESTIMONIAL INDEX IN TESTIMONIALS
    let testimonial = testimonials.find((testimonial) => testimonial.id == req.params.id);
    if (!testimonial) res.status(404).send({ msg: "Testimonial not found" });
    let { title, img, github, netlify, stack } = req.body;

    // WRITE DETAILS TO TESTIMONIAL
    if (title) testimonial.title = title;
    if (stack) testimonial.stack = stack;
    if (github) testimonial.github = github;
    if (netlify) testimonial.netlify = netlify;
    if (img) testimonial.img = img;
    res.send(testimonial);
  });


app.delete('/:id', (req, res) => {
    testimonials = testimonials.filter((testimonial) => testimonial.id != req.params.id);
    fixArrayId(testimonials);
    res.send({ msg: 'Item removed' });
});

module.exports = app;