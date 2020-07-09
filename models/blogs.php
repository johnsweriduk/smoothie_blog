<?
$dbconn = null;
if (getenv('DATABASE_URL')) {
    $connectionConfig = parse_url(getenv('DATABASE_URL'));
    $host = $connectionConfig['host'];
    $user = $connectionConfig['user'];
    $password = $connectionConfig['pass'];
    $port = $connectionConfig['port'];
    $dbname = trim($connectionConfig['path'], '/');
    $dbconn = pg_connect(
        "host=" . $host . " " .
        "user=" . $user . " " .
        "password=" . $password . " " .
        "port=" . $port . " " .
        "dbname=" . $dbname
    );
} else {
    $dbconn = pg_connect("host=localhost dbname=smoothiesgalore user=postgres");
}
​
class Blog
{
    public $id;
    public $title;
    public $author;
    public $image;
    public $content;
    public $snippet;
    public $created_at;
    public $is_featured;
    public $likes;
​
    public function __construct($id, $title, $author, $image, $content, $snippet, $created_at, $is_featured, $likes)
    {
        $this->id = $id;
        $this->title = $title;
        $this->author = $author;
        $this->image = $image;
        $this->content = $content;
        $this->snippet = $snippet;
        $this->created_at = $created_at;
        $this->is_featured = $is_featured;
        $this->likes = $likes;
    }
}
​
class Blogs
{
    static function all()
    {
        $blogs = array();
​
        $results = pg_query("SELECT * FROM posts");
​
        $row_object = pg_fetch_object($results);
        while ($row_object) {
            $new_blog = new Blog(
                intval($row_object->id),
                $row_object->title,
                $row_object->author,
                $row_object->image,
                $row_object->content,
                $row_object->snippet,
                $row_object->created_at,
                $row_object->is_featured,
                $row_object->likes
            );
            $blogs[] = $new_blog;
            $row_object = pg_fetch_object($results);
        }
        return $blogs;
    }

    static function featured()
    {
        $blogs = array();
​
        $results = pg_query("SELECT * FROM posts where is_featured = TRUE");
​
        $row_object = pg_fetch_object($results);
        while ($row_object) {
            $new_blog = new Blog(
                intval($row_object->id),
                $row_object->title,
                $row_object->author,
                $row_object->image,
                $row_object->content,
                $row_object->snippet,
                $row_object->created_at,
                $row_object->is_featured,
                $row_object->likes
            );
            $blogs[] = $new_blog;
            $row_object = pg_fetch_object($results);
        }
        return $blogs;
    }

    static function single($id)
    {
        $query = "SELECT * FROM posts WHERE id = $1";
        $query_params = array($id);
        $results = pg_query_params($query, $query_params);
        $blog = '';
​
        $row_object = pg_fetch_object($results);
        while ($row_object) {
            $new_blog = new Blog(
                intval($row_object->id),
                $row_object->title,
                $row_object->author,
                $row_object->image,
                $row_object->content,
                $row_object->snippet,
                $row_object->created_at,
                $row_object->is_featured,
                $row_object->likes
            );
            $blog = $new_blog;
            $row_object = pg_fetch_object($results);
        }
        return $blog;
    }

    static function create($blog)
    {
        $query = "INSERT INTO posts (title, author, image, content, snippet, created_at, is_featured, likes)  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
        $query_params = array($blog->title, $blog->author, $blog->image, $blog->content, $blog->snippet, $blog->created_at, intval($blog->is_featured), $blog->likes);
        $result = pg_query_params($query, $query_params);
​
​
        $results = pg_query("SELECT * FROM posts ORDER BY id DESC LIMIT 1");
        $row_object = pg_fetch_object($results);
        while ($row_object) {
            $new_blog = new Blog(
                intval($row_object->id),
                $row_object->title,
                $row_object->author,
                $row_object->image,
                $row_object->content,
                $row_object->snippet,
                $row_object->created_at,
                $row_object->is_featured,
                $row_object->likes
            );
            $blog = $new_blog;
            $row_object = pg_fetch_object($results);
        }
        return $blog;
    }
​
    static function update($updated_blog)
    {
        $query = "UPDATE posts SET title = $1, author = $2, image = $3, content = $4, snippet = $5, created_at = $6, is_featured = $7, likes = $8 WHERE id = $9";
        $query_params = array($updated_blog->title, $updated_blog->author, $updated_blog->image, $updated_blog->content, $updated_blog->snippet, $updated_blog->created_at, intval($updated_blog->is_featured), $updated_blog->id, $updated_blog->likes);
        $result = pg_query_params($query, $query_params);
​
        return self::all();
    }
​
    static function delete($id)
    {
        $query = "DELETE FROM posts WHERE id = $1";
        $query_params = array($id);
        $result = pg_query_params($query, $query_params);
​
        return self::all();
    }
}
