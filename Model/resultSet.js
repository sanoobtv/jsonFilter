
function resultSet( image,  slug,  title)
{
this.image=image;
this.slug=slug;
this.title=title;
}

resultSet.prototype.read = function read() {console.log(this.image);};

module.exports=resultSet;
