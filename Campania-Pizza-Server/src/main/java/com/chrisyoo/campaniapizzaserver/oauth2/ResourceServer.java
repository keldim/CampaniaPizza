package com.chrisyoo.campaniapizzaserver.oauth2;

import java.io.IOException;
import java.security.Principal;
import java.util.Locale;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.mitre.oauth2.introspectingfilter.IntrospectingTokenService;
import org.mitre.oauth2.introspectingfilter.service.impl.StaticIntrospectionConfigurationService;
import org.mitre.oauth2.model.ClientDetailsEntity.AuthMethod;
import org.mitre.oauth2.model.RegisteredClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.authentication.BearerTokenExtractor;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.ModelAndView;

//@Controller
//@EnableWebSecurity
//@Configuration
//@EnableResourceServer // [2]
//@ComponentScan({ "com.chrisyoo.campaniapizzaserver.oauth2" })
public class ResourceServer extends ResourceServerConfigurerAdapter {

//    private static final Logger logger = LoggerFactory.getLogger(ResourceServer.class);
//
//    @Value("${oidc.jwks.keys}")
//    private String jwksString;
//
//    @Value("${oidc.introspectEndpointUri}")
//    private String introspectURL;
//
//    @Value("${oidc.clientId}")
//    private String clientId;
//
//    @Value("${oidc.clientSecret}")
//    private String clientSecret;

//    IntrospectingTokenService introspectTokenService = new IntrospectingTokenService();
//
//    @RequestMapping(value = "/", method = RequestMethod.GET)
//    public ModelAndView modelHome(Locale locale, Principal p) {
//
//        logger.info("Initializing service resource");
//
//        ModelAndView model = new ModelAndView("/home.tiles");
//        return model;
//    }
//
//    @RequestMapping(value = "/jwk", method = RequestMethod.GET, produces = "application/json")
//    public @ResponseBody String jwk() {
//        return jwksString;
//    }
//
//    @RequestMapping(value = "/restService", method = RequestMethod.POST)
//    public @ResponseBody String restService(HttpServletRequest request, HttpServletResponse respose) {
//
//        logger.info("Calling rest service");
//
//        String requestToString = request.toString();
//
//        String headerType = request.getHeader("Content-Type");
//        String headerAuth = request.getHeader("Authorization");
//
//        String token = headerAuth.split(" ")[1];

//////         introspectTokenService.readAccessToken(token);

//        Map map = request.getParameterMap();
//
//        String attributes = request.getAttributeNames().toString();

        ////// String someParam = request.getParameter("someParam");

//        return "{\"status\":\"OK\"}";
//    }

//    @Override
//    public void configure(HttpSecurity http) throws Exception {
//         http.requestMatcher(new OAuthRequestedMatcher())
//         .authorizeRequests()
//          .antMatchers(HttpMethod.OPTIONS).permitAll()
//             .anyRequest().authenticated();
//////      http.addFilterBefore(new TokenExtractorFilter(), BasicAuthenticationFilter.class).requestMatchers()
//////              .antMatchers("/rest/service/sample/restService").and().authorizeRequests().anyRequest()
//////              .access("ROLE_API");
//    }
//
//    @Override
//    public void configure(ResourceServerSecurityConfigurer resources) throws Exception {
//        resources.resourceId("W3IDRealm");
//        resources.tokenExtractor(new BearerTokenExtractor());
//
//        StaticIntrospectionConfigurationService introspectConfig = new StaticIntrospectionConfigurationService();
//
//        introspectConfig.setIntrospectionUrl(introspectURL);
//
//        RegisteredClient client = new RegisteredClient();
//        client.setClientId(clientId);
//        client.setClientSecret(clientSecret);
//        client.setTokenEndpointAuthMethod(AuthMethod.NONE);
//
//        introspectConfig.setClientConfiguration(client);
//
//        introspectTokenService.setIntrospectionConfigurationService(introspectConfig);
//
//        resources.tokenServices(introspectTokenService);
//    }
//
//    private static class OAuthRequestedMatcher implements RequestMatcher {
//
//        public boolean matches(HttpServletRequest request) {
//
//            String auth = request.getHeader("Authorization");
//            //// Determine if the client request contained an OAuth Authorization
//            boolean haveOauth2Token = (auth != null) && auth.startsWith("Bearer");
//            boolean haveAccessToken = request.getParameter("access_token")!=null;
//            return haveOauth2Token || haveAccessToken;
//        }
//
//    }
//
//    class TokenExtractorFilter extends OncePerRequestFilter implements Filter, InitializingBean {
//
//        @Override
//        protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

            //////UserDetails details = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

//            BearerTokenExtractor bte = new BearerTokenExtractor();
//
//            String mytoken = bte.extract(request).toString();

//            logger.info("Filter activated");

//        }
//
//    }

}