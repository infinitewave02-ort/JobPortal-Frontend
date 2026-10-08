import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import styles from "../styles/Root";

const Root = ({ navigation }) => {
  // ============================================
  // NAVIGATION
  // ============================================

  const handleEmployee = () => {
    navigation.navigate("EmployeeLogin");
  };

  const handleEmployer = () => {
    navigation.navigate("EmployerLogin");
  };

  const handleAdmin = () => {
    navigation.navigate("AdminLogin");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
      />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        <TouchableOpacity 
          onPress={handleAdmin} 
          style={{ position: 'absolute', top: 40, right: 20, zIndex: 100, padding: 10 }}
        >
          <Ionicons name="settings-outline" size={24} color="#CCC" />
        </TouchableOpacity>

        {/* ==================================================
            JOB PORTAL LOGO
        ================================================== */}

        <View style={styles.brandSection}>

          {/* Logo */}
          <View style={styles.logoContainer}>

            {/* Blue Person */}
            <View style={styles.logoPersonBlue}>
              <Ionicons
                name="person"
                size={29}
                color="#FFFFFF"
              />
            </View>

            {/* Purple Person */}
            <View style={styles.logoPersonPurple}>
              <Ionicons
                name="person"
                size={29}
                color="#FFFFFF"
              />
            </View>

            {/* Search Circle */}
            <View style={styles.logoSearchCircle}>

              <Ionicons
                name="search"
                size={29}
                color="#2563EB"
              />

              {/* Small Briefcase */}
              <View style={styles.logoBriefcase}>
                <Ionicons
                  name="briefcase"
                  size={14}
                  color="#2563EB"
                />
              </View>

            </View>
          </View>

          {/* Brand Name */}
          <Text style={styles.logoText}>
            <Text style={styles.logoBlue}>
              Job
            </Text>

            <Text style={styles.logoPurple}>
              Portal
            </Text>
          </Text>


       
        </View>

        {/* ==================================================
            HERO SECTION
        ================================================== */}

        <View style={styles.heroSection}>

          <Text style={styles.heroTitle}>
            Find Opportunities.
          </Text>

          <Text style={styles.heroTitle}>
            Build a Better Tomorrow.
          </Text>

        </View>



        {/* ==================================================
            EMPLOYEE CARD
        ================================================== */}

        <RoleCard
          type="employee"
          title="I'm an Employee"
          icon="person"
          arrowColor="#2563EB"
          onPress={handleEmployee}
          features={[
            "Search Jobs",
            "Upload Resume",
            "Get Noticed",
          ]}
        />

        {/* ==================================================
            EMPLOYER CARD
        ================================================== */}

        <RoleCard
          type="employer"
          title="I'm an Employer"
          icon="business"
          arrowColor="#7C3AED"
          onPress={handleEmployer}
          features={[
            "Search Candidates",
            "Post Jobs",
            "Hire Faster",
          ]}
        />


        {/* ==================================================
            FOOTER
        ================================================== */}

        <View style={styles.footer}>

          <View style={styles.footerHeadingRow}>

            <View style={styles.footerLine} />

            <Text style={styles.footerTitle}>
              Together for a Brighter Career Future
            </Text>

            <View style={styles.footerLine} />

          </View>

          <View style={styles.trustRow}>

            <TrustItem
              icon="shield-checkmark"
              text="Secure"
            />

            <TrustItem
              icon="checkmark-circle"
              text="Reliable"
            />

            <TrustItem
              icon="ribbon"
              text="Trusted"
            />

          </View>

          <Text style={styles.copyright}>
            © 2025 JobPortal. All rights reserved.
          </Text>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
};


/* ============================================================
   ROLE CARD COMPONENT
============================================================ */

const RoleCard = ({
  type,
  title,
  description,
  icon,
  arrowColor,
  onPress,
  features,
}) => {

  const getCardStyle = () => {
    switch (type) {
      case "employee":
        return styles.employeeCard;

      case "employer":
        return styles.employerCard;

      case "admin":
        return styles.adminCard;

      default:
        return styles.employeeCard;
    }
  };

  const getIconStyle = () => {
    switch (type) {
      case "employee":
        return styles.employeeIcon;

      case "employer":
        return styles.employerIcon;

      case "admin":
        return styles.adminIcon;

      default:
        return styles.employeeIcon;
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.88}
      style={[
        styles.roleCard,
        getCardStyle(),
      ]}
      onPress={onPress}
    >

      {/* ==============================================
          TOP SECTION
      =============================================== */}

      <View style={styles.roleTopRow}>

        {/* Role Icon */}
        <View
          style={[
            styles.roleIcon,
            getIconStyle(),
          ]}
        >

          <Ionicons
            name={icon}
            size={36}
            color="#FFFFFF"
          />

          {/* Employee Small Briefcase */}
          {type === "employee" && (
            <View style={styles.smallBriefcase}>
              <Ionicons
                name="briefcase"
                size={14}
                color="#FFFFFF"
              />
            </View>
          )}

        </View>

        {/* Text */}
        <View style={styles.roleContent}>

          <Text style={styles.roleTitle}>
            {title}
          </Text>

          <Text style={styles.roleDescription}>
            {description}
          </Text>

        </View>

        {/* Arrow */}
        <View
          style={[
            styles.arrowButton,
            {
              backgroundColor: arrowColor,
            },
          ]}
        >

          <Ionicons
            name="arrow-forward"
            size={25}
            color="#FFFFFF"
          />

        </View>

      </View>


      {/* ==============================================
          FEATURES
      =============================================== */}

      <View style={styles.featureRow}>

        {features.map((feature, index) => (
          <Feature
            key={`${type}-feature-${index}`}
            text={feature}
            color={arrowColor}
          />
        ))}

      </View>

    </TouchableOpacity>
  );
};


/* ============================================================
   FEATURE COMPONENT
============================================================ */

const Feature = ({
  text,
  color,
}) => {

  return (
    <View style={styles.feature}>

      <View
        style={[
          styles.featureCheck,
          {
            backgroundColor: color,
          },
        ]}
      >

        <Ionicons
          name="checkmark"
          size={13}
          color="#FFFFFF"
        />

      </View>

      <Text style={styles.featureText}>
        {text}
      </Text>

    </View>
  );
};


/* ============================================================
   TRUST ITEM
============================================================ */

const TrustItem = ({
  icon,
  text,
}) => {

  return (
    <View style={styles.trustItem}>

      <View style={styles.trustIcon}>

        <Ionicons
          name={icon}
          size={12}
          color="#172554"
        />

      </View>

      <Text style={styles.trustText}>
        {text}
      </Text>

    </View>
  );
};


export default Root;