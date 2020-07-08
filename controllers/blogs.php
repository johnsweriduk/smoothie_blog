<?php

include_once __DIR__ . '/../models/blogs.php';
header('Content-Type: application/json');
if ($_REQUEST['action'] === 'index') {
    echo json_encode(Blogs::all());
} elseif ($_REQUEST['action'] === 'blog') {
    $request_body = file_get_contents('php://input');
    $body_object = json_decode($request_body);
    $new_blog = new Blog(null, $body_object->author, $body_object->image, $body_object->content, $body_object->snippet, $body_object->created_at, $body_object->is_featured, $body_object->likes);
    $all_blogs = Blogs::create($new_blog);
    echo json_encode($all_blogs);
} else if ($_REQUEST['action'] === 'update'){
    $request_body = file_get_contents('php://input');
    $body_object = json_decode($request_body);
    $updated_blog = new Blog($_REQUEST['id'], $body_object->author, $body_object->image, $body_object->content, $body_object->snippet, $body_object->created_at, $body_object->is_featured, $body_object->likes);
    $all_blogs = Blogs::update($updated_blog);
    echo json_encode($all_blogs);
} else if ($_REQUEST['action'] === 'delete') {
    $all_blogs = Blogs::delete($_REQUEST['id']);
    echo json_encode($all_blogs);
}

?>
