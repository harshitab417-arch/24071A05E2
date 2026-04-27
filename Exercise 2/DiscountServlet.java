import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class DiscountServlet extends HttpServlet {

    public void doPost(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {

        res.setContentType("text/html");
        PrintWriter out = res.getWriter();

        String uname = req.getParameter("uname");
        Double price = 0.0;
	try {
    		price = Double.parseDouble(req.getParameter("price"));
	} catch (Exception e) {
		out.println("<center>");
    		out.println("<h3>Invalid Price Format</h3>");
		out.println("</center>");
    		return;
	}
        // Basic validation
        if(uname != null && !uname.isEmpty()) {
	    Double final_price=price;
            if(price>=1000 && price<2000){
		final_price=price-(0.1*price);
	    }
	    else if(price>=2000 && price<5000){
		final_price=price-(0.2*price);
	    }
	    else{
		final_price=price-(0.5*price);
	    }
	    out.println("<center>");
	    out.println("<h2>Welcome " + uname + "</h2>");
	    out.println("<h2>Actual Price: "+ price + "</h2>");
	    out.println("<h2>Final Price: " + final_price + "</h2>");
            for(int i=0;i<20;i++){
		out.println("<br>");
	    }
	    out.println("<h2>24071A05E2. All rights reserved.</h2>");
            out.println("</center>");
        } else {
 	    out.println("<center>");
            out.println("<h3>Invalid Input</h3>");
	    out.println("</center>");
        }
    }
}