export const  data = [
    {
        id: 1,
        name: "sala 1",
        description: "sala de reuniones",
        image: "https://picsum.photos/800/600",
        create_at: "2021-09-01 11:00:00",
        update_at: "2021-09-21 9:00:00",
        users_count: 5,
    },
    {
        id: 2,
        name: "sala 2",
        description: "sala de reuniones",
        image: "https://picsum.photos/800/600",
        create_at: "2021-10-01 6:00:00",
        update_at: "2021-12-01 12:00:00",
        users_count: 0,
    },
]

export const data2 = {
    id: 1,
    name: "sala 1",
    description: "sala de reuniones",
    image: "https://picsum.photos/800/600",
    create_at: "2021-09-01 11:00:00",
    update_at: "2021-09-21 9:00:00",
    users_count: 5,
    user:{
        id:1,
        first_name:"ElmerC",
        avatar:2
    }
}

export const data3 = [
    {
        id: 1,
        room_id: 1,
        user_id: 104,
        content: "<p><strong>Hola</strong><em><u> Mundo! </u></em>😎✌️ </p><p><br></p><ol><li>1 dasdas</li><li>2 dasdasd</li><li>3 dasd</li></ol>",
        create_at: "2021-09-01 11:00:00",
        update_at: "2021-09-21 9:00:00",
        user:{
            id:104,
            username:"shinigamiliw",
            avatar:24
        },
    },
    {
        id: 2,
        room_id: 1,
        user_id: 9,
        content: "<p>&lt;p&gt;Este es un párrafo &lt;a href='http://sitio-seguro.com'&gt;con un enlace seguro&lt;/a&gt;.&lt;/p&gt;&lt;script&gt;alert('¡Código malicioso!');&lt;/script&gt;</p>",
        create_at: "2021-09-01 11:00:00",
        update_at: "2021-09-21 9:00:00",
        user:{
            id:9,
            username:"Samuel",
            avatar:7
        },
    },
    {
        id: 3,
        room_id: 1,
        user_id: 104,
        content: "&lt;p&gt;&amp;lt;p&amp;gt;Este es un párrafo &amp;lt;a href=&#x27;http://sitio-seguro.com&#x27;&amp;gt;con un enlace seguro&amp;lt;/a&amp;gt;.&amp;lt;/p&amp;gt;&amp;lt;script&amp;gt;alert(&#x27;¡Código malicioso!&#x27;);&amp;lt;/script&amp;gt;&lt;/p&gt;",
        create_at: "2021-09-01 11:00:00",
        update_at: "2021-09-01 11:00:00",
        user:{
            id:104,
            username:"shinigamiliw",
            avatar:24
        },
    },
    {
        id: 4,
        room_id: 1,
        user_id: 9,
        content: "<p>Este es un <strong>párrafo</strong> con un <a href='http://sitio-malicioso.com' onclick='alert(\"¡Código malicioso!\"); return false;'>enlace peligroso</a>.</p>",
        create_at: "2021-09-01 11:00:00",
        update_at: "2021-09-21 9:00:00",
        user:{
            id:9,
            username:"Samuel",
            avatar:7
        },
    },
    {
        id: 5,
        room_id: 1,
        user_id: 1,
        content: "<p>&lt;p&gt;Este es un &lt;strong&gt;párrafo&lt;/strong&gt; con un &lt;a href='http://sitio-malicioso.com' onclick='alert(\"¡Código malicioso!\"); return false;'&gt;enlace peligroso&lt;/a&gt;.&lt;/p&gt;</p>",
        create_at: "2021-09-01 11:00:00",
        update_at: "2021-09-01 11:00:00",
        user:{
            id:104,
            username:"shinigamiliw",
            avatar:24
        },
    },
    {
        id: 6,
        room_id: 1,
        user_id: 9,
        content: "&amp;quot;&amp;lt;p&amp;gt;Este es un comentario &amp;lt;script&amp;gt;alert(&amp;#x27;¡Código malicioso!&amp;#x27;);&amp;lt;/script&amp;gt; &amp;lt;strong&amp;gt;enriquecido&amp;lt;/strong&amp;gt; con HTML.&amp;lt;/p&amp;gt;&amp;quot;",
        create_at: "2021-09-01 11:00:00",
        update_at: "2021-09-01 11:00:00",
        user:{
            id:9,
            username:"Samuel",
            avatar:7
        },
    },

]