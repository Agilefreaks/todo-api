package ro.agilefreaks.todoapi.servlets;

import com.github.jasminb.jsonapi.JSONAPIDocument;
import com.github.jasminb.jsonapi.ResourceConverter;
import com.github.jasminb.jsonapi.exceptions.DocumentSerializationException;
import ro.agilefreaks.todoapi.model.TodoItem;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/v1/todos")
public class TodoListServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        List<TodoItem> itemList = new ArrayList<>();
        itemList.add(new TodoItem("1", "buy milk"));
        itemList.add(new TodoItem("2", "buy eggs"));
        itemList.add(new TodoItem("3", "buy meat"));
        itemList.add(new TodoItem("4", "screw vegans"));

        try {
            ResourceConverter converter = new ResourceConverter(TodoItem.class);
            byte[] serializedObject =
                    converter.writeDocumentCollection(new JSONAPIDocument<>(itemList));
            OutputStream out = response.getOutputStream();
            out.write(serializedObject);
        } catch (DocumentSerializationException e) {
            e.printStackTrace();
        }
    }
}
